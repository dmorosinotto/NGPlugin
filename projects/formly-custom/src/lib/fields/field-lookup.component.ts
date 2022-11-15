import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Type } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { FormlyModule, FieldType, FieldTypeConfig, FormlyFieldProps, FormlyFieldConfig } from "@ngx-formly/core";
import {
    AircraftModel,
    AirportModel,
    CountryModel,
    CustomerModel,
    FlightQualificationModel,
    FlightTypeModel,
    getIDAircraft,
    getIDAirport,
    getIDCountry,
    getIDCustomer,
    getIDFlightQualification,
    getIDFlightType,
    getIDHandler,
    getIDRegistration,
    getIDServiceType,
    formatAircraft,
    formatAirport,
    formatCountry,
    formatCustomer,
    formatFlightQualification,
    formatFlightType,
    formatHandler,
    formatRegistration,
    formatServiceType,
    HandlerModel,
    LookupChangeEvent,
    LookupColumn,
    LookupParameters,
    NGenericLookupComponent,
    RegistrationModel,
    ServiceTypeModel,
    LookupGetIDFn,
    LookupFormatFn,
} from "@app/try-plugin";

export const LOOKUP_IDFIELDS = {
    Aircraft: getIDAircraft,
    Airport: getIDAirport,
    FlightQualification: getIDFlightQualification,
    FlightType: getIDFlightType,
    ServiceType: getIDServiceType,
    Country: getIDCountry,
    Customers: getIDCustomer,
    Handler: getIDHandler,
    Registration: getIDRegistration,
} as const;

export const LOOKUP_FORMATTERS = {
    Aircraft: formatAircraft,
    Airport: formatAirport,
    FlightQualification: formatFlightQualification,
    FlightType: formatFlightType,
    ServiceType: formatServiceType,
    Country: formatCountry,
    Customers: formatCustomer,
    Handler: formatHandler,
    Registration: formatRegistration,
} as const;

export type LookupModels = {
    Aircraft: AircraftModel;
    Airport: AirportModel;
    FlightQualification: FlightQualificationModel;
    FlightType: FlightTypeModel;
    ServiceType: ServiceTypeModel;
    Country: CountryModel;
    Customers: CustomerModel;
    Handler: HandlerModel;
    Registration: RegistrationModel;
};
export type LookupTypes = keyof LookupModels & string; // EQUIVALE A "Aircraft" | "Airport" | "FlightQualification" | "FlightType" | "ServiceType" | "Country" | "Customers" | "Handler" | "Registration"

export type LookupPluginProps = {
    // LISTA PARAMETRI OPZIONALI PER FARE LOOKUP CUSTOM FUORI STANDARD
    url?: string;
    urlAutocomplete?: string;
    getCustomColumns?: (colsToModify: Array<LookupColumn>, type?: string) => void;
    maxDigit?: number;
    getRuntimeParameters?: () => LookupParameters;
    datasourceParameters?: string;
    remote?: boolean;
    loggerName?: string;
    IcaoIataOrder?: "IcaoIata" | "IataIcao";
    gridPlaceholder?: string;
    pageSize?: number;
};

export type LookupBaseProps<M = any, L = LookupTypes | string> = Omit<FormlyFieldProps, "change"> & LookupProps<M, L> & LookupPluginProps;
export type LookupProps<M = any, L = LookupTypes | string> = {
    lookup: L;
    idField: LookupGetIDFn<M>; // keyof M | ((m: M | null) => any);
    formatter?: LookupFormatFn<M>; //(m: M | null) => string;
    change?: (field: FormlyFieldConfig, event: LookupChangeEvent<M>) => void;
    immutable?: boolean;
};
export interface FormlyLookupFieldConfig<M = any, L = LookupTypes | string> extends FormlyFieldConfig<LookupBaseProps<M, L>> {
    type: "lookup" | Type<FormlyFieldLookup>;
}

export type LookupStandardProps<L extends LookupTypes> = Omit<LookupBaseProps<LookupModels[L], L>, "lookup" | "idField"> & {
    idField?: LookupGetIDFn<LookupModels[L]>;
};
export function lookupField<L extends LookupTypes>(
    key: string,
    lookup: L,
    label: string,
    props?: LookupStandardProps<L>,
    required?: boolean
): FormlyLookupFieldConfig<LookupModels[L], L> {
    return {
        type: "lookup",
        key,
        props: {
            ...props,
            label,
            required,
            lookup,
            idField: props?.idField ?? (LOOKUP_IDFIELDS[lookup] as LookupGetIDFn<LookupModels[L]>),
            formatter: props?.formatter ?? (LOOKUP_FORMATTERS[lookup] as LookupFormatFn<LookupModels[L]>),
        },
    };
}

export type RequiredCustomProps = Required<Pick<LookupPluginProps, "url" | "urlAutocomplete" | "getCustomColumns">>;
export type OptionalCustomProps = Omit<LookupPluginProps, keyof RequiredCustomProps>;

export type LookupCustomProps<M = any> = Omit<FormlyFieldProps, "change"> &
    Omit<LookupProps<M>, "lookup" | "formatter"> &
    RequiredCustomProps &
    OptionalCustomProps & {
        formatter: LookupFormatFn<M>;
    };
export function lookupCustomField<M = any>(
    key: string,
    lookup: string = "__CUSTOM__",
    label: string,
    props: LookupCustomProps<M>,
    required?: boolean
): FormlyLookupFieldConfig<M> {
    return {
        type: "lookup",
        key,
        props: {
            ...props,
            label,
            required,
            lookup,
        },
    };
}

// export type InferModel<L extends string, M = any> = L extends LookupTypes ? LookupModels[L] : M;

// type InferProps<L extends string, M = any> = L extends LookupTypes
//     ? Omit<LookupProps<InferModel<L, M>>, "lookup" | "idField" | "formatter">
//     : Omit<LookupProps<InferModel<L, M>>, "lookup">;

// type FNParams<L extends string, M = any> = L extends LookupTypes
//     ? [string, L, string, InferProps<L, M>?, boolean?]
//     : [string, L, string, InferProps<L, M>, boolean?];

// export function lookupFieldXXX<M = any, L extends string = string>(...args: FNParams<L, M>): FormlyLookupFieldConfig<M> {
//     const key = args[0];
//     const lookup = args[1];
//     const label = args[2];
//     const props = args[3];
//     const required = args[4];

//     return {
//         type: "lookup",
//         key,
//         props: {
//             ...props,
//             label,
//             required,
//             lookup,
//             idField: lookup in LOOKUP_IDFIELDS ? LOOKUP_IDFIELDS[lookup as LookupTypes] : (props.idField as any),
//             formatter: lookup in LOOKUP_FORMATTERS ? LOOKUP_FORMATTERS[lookup as LookupTypes] : (props.formatter as any),
//         },
//     };
// }

@Component({
    selector: "formly-field-lookup",
    // standalone: true,
    // imports: [CommonModule, FormlyModule, ReactiveFormsModule, NGenericLookupComponent],
    template: `
        <n-generic-lookup
            [formControl]="formControl"
            [formlyAttributes]="field"
            [(model)]="formState.lookup[$any(key)]"
            [type]="props.lookup"
            [idField]="props.idField"
            [formatter]="props.formatter"
            [immutable]="props.immutable"
            [maxDigit]="props.maxDigit"
            [url]="props.url"
            [urlAutocomplete]="props.urlAutocomplete"
            [getCustomColumns]="props.getCustomColumns"
            [getRuntimeParameters]="props.getRuntimeParameters"
            [datasourceParameters]="props.datasourceParameters"
            [remote]="props.remote"
            [loggerName]="props.loggerName"
            [IcaoIataOrder]="props.IcaoIataOrder"
            [gridPlaceholder]="props.gridPlaceholder"
            [pageSize]="props.pageSize"
        ></n-generic-lookup>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [".ng-invalid ::ng-deep button {background-color: red}"],
})
export class FormlyFieldLookup extends FieldType<FieldTypeConfig<LookupBaseProps>> {
    override defaultOptions = {
        props: {
            lookup: "", //MUST BE SPECIFIED IN FieldConfig
            idField: "", //MUST BE SPECIFIED IN FieldConfig
            remote: false,
            loggerName: "Application",
            IcaoIataOrder: "IcaoIata" as const,
            pageSize: 5,
        },
    };
}
