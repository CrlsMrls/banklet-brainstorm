import {
  NgModule,
  ModuleWithProviders,
  ANALYZE_FOR_ENTRY_COMPONENTS,
  Inject,
  Injectable,
  ComponentFactoryResolver,
  Injector,
  NgModuleFactory,
  NgModuleRef,
  Compiler,
  NgModuleFactoryLoader
} from '@angular/core';
import { Route, ROUTES, ActivatedRouteSnapshot } from '@angular/router';
import { Type } from '@angular/compiler';

interface RoutableOptions {
  routes: Route[];
  params: any;
}

interface NonRoutableOptions {
  name: string;
  component: Type;
  params: any;
}

@NgModule({})
export class BankletModule {
  static configureBankletRoutes(
    options: RoutableOptions
  ): ModuleWithProviders<BankletModule> {
    return {
      ngModule: BankletModule,
      providers: getRouteProviders(options)
    };
  }

  static configureBankletComponent(
    options: NonRoutableOptions
  ): ModuleWithProviders<BankletModule> {
    return {
      ngModule: BankletModule,
      providers: getComponentProviders(options)
    };
  }
}

@Injectable()
export class BankletComponentCreator {
  constructor(private compiler: Compiler, private injector: Injector) {}

  async createComponentFactory(bankletModuleRefPromise: Promise<any>) {
    const moduleFactory: NgModuleFactory<BankletModule> = await this.getModuleFactory(bankletModuleRefPromise);
    const moduleRef: NgModuleRef<BankletModule> = moduleFactory.create(this.injector);
    return moduleRef.injector.get(ComponentFactory);
  }

  private async getModuleFactory(
    modulePromise: Promise<NgModuleRef<BankletModule>>
  ): Promise<NgModuleFactory<BankletModule>> {
    const module: any = await modulePromise;
    if (module.MybankletModule instanceof NgModuleFactory) {
      return module.MybankletModule;
    }
    return await this.compiler.compileModuleAsync(module.MybankletModule);
  }
}

class CheckSchema {
  constructor(@Inject('options') private options: RoutableOptions) {}

  canActivate(route: ActivatedRouteSnapshot) {
    // validate route against schema
    console.log('activating stuff', this.options);
    return true;
  }
}

export function getRouteProviders<TConfig>(options: RoutableOptions) {
  return [
    CheckSchema,
    {
      provide: 'options',
      useValue: options
    },
    {
      provide: ANALYZE_FOR_ENTRY_COMPONENTS,
      multi: true,
      useValue: options.routes
    },
    {
      provide: ROUTES,
      multi: true,
      useValue: [
        {
          path: '',
          // make a resolver so you can typecast them
          canActivate: [CheckSchema],
          children: options.routes
        }
      ]
    }
  ];
}

@Injectable()
export class ComponentFactory {
  constructor(
    @Inject('options') private options: NonRoutableOptions,
    private cmp: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  create(element: any, params: any) {
    // validate route against schema
    console.log('checking params', element);
    const ref = this.cmp
      .resolveComponentFactory(this.options.component as any)
      .create(this.injector);

    element.nativeElement.appendChild(ref.location.nativeElement);
  }
}

export function getComponentProviders(options: NonRoutableOptions) {
  return [
    ComponentFactory,
    {
      provide: 'options',
      useValue: options
    },
    {
      provide: ANALYZE_FOR_ENTRY_COMPONENTS,
      multi: true,
      useValue: [{ path: '', component: options.component }]
    }
  ];
}
