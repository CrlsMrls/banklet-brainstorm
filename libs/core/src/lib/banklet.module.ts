import {
  NgModule,
  ModuleWithProviders,
  ANALYZE_FOR_ENTRY_COMPONENTS,
  Inject,
  Injectable,
  ComponentFactoryResolver,
  Injector,
  Compiler
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
  constructor(private compiler: Compiler, private inj: Injector) {}
  // TODO: do not pass the dom element to attach, return the component and append to DOM in the application
  create(bankletModulePromise: Promise<any>, domelement: any, params: any) {
    bankletModulePromise
      .then(m => {
        // check if Module is already a factory => then skip
        return this.compiler.compileModuleAsync(m.MybankletModule);
      })
      .then(f => {
        const m = f.create(this.inj);
        m.injector.get(CreateComponent).create(domelement, params);
      });
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
export class CreateComponent {
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
    CreateComponent,
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
