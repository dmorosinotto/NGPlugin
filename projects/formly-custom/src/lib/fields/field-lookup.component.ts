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
} from "@app/try-plugin";

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
export type LookupTypes = keyof LookupModels; // EQUIVALE A "Aircraft" | "Airport" | "FlightQualification" | "FlightType" | "ServiceType" | "Country" | "Customers" | "Handler" | "Registration"

export type InferModel<L extends string, M = any> = L extends LookupTypes ? LookupModels[L] : M;

export type LookupProps<M = any> = FormlyFieldProps & {
    lookup: LookupTypes | string;
    idField: keyof M | ((m: M | null) => any);
    immutable?: boolean;
    formatter?: (m: M | null) => string;
    change?: (field: FormlyFieldConfig, event: LookupChangeEvent<M>) => void;
    // LISTA PARAMETRI OPZIONALI PER FARE LOOKUP CUSTOM FUORI STANDARD
    maxDigit?: number;
    url?: string;
    urlAutocomplete?: string;
    getCustomColumns?: (colsToModify: Array<LookupColumn>, type?: string) => void;
    getRuntimeParameters?: () => LookupParameters;
    datasourceParameters?: string;
    remote?: boolean;
    loggerName?: string;
    IcaoIataOrder?: "IcaoIata" | "IataIcao";
    gridPlaceholder?: string;
    pageSize?: number;
};

type InferProps<L extends string, M = any> = L extends LookupTypes
    ? Omit<LookupProps<InferModel<L, M>>, "lookup" | "idField" | "formatter">
    : Omit<LookupProps<InferModel<L, M>>, "lookup">;

type FNParams<L extends string, M = any> = L extends LookupTypes
    ? [string, L, string, InferProps<L, M>?, boolean?]
    : [string, L, string, InferProps<L, M>, boolean?];

export interface FormlyLookupFieldConfig<M = any> extends FormlyFieldConfig<LookupProps<M>> {
    type: "lookup" | Type<FormlyFieldLookup>;
}

export function lookupField<M = any, L extends string = string>(...args: FNParams<L, M>): FormlyLookupFieldConfig {
    const key = args[0];
    const lookup = args[1];
    const label = args[2];
    const props = args[3];
    const required = args[4];

    const idFields = {
        Aircraft: getIDAircraft,
        Airport: getIDAirport,
        FlightQualification: getIDFlightQualification,
        FlightType: getIDFlightType,
        ServiceType: getIDServiceType,
        Country: getIDCountry,
        Customers: getIDCustomer,
        Handler: getIDHandler,
        Registration: getIDRegistration,
    };

    const formatters = {
        Aircraft: formatAircraft,
        Airport: formatAirport,
        FlightQualification: formatFlightQualification,
        FlightType: formatFlightType,
        ServiceType: formatServiceType,
        Country: formatCountry,
        Customers: formatCustomer,
        Handler: formatHandler,
        Registration: formatRegistration,
    };

    return {
        type: "lookup",
        key,
        props: {
            ...props,
            label,
            required,
            lookup,
            idField: lookup in idFields ? idFields[lookup as LookupTypes] : props.idField,
            formatter: lookup in formatters ? formatters[lookup as LookupTypes] : props.formatter,
        },
    };
}

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
export class FormlyFieldLookup extends FieldType<FieldTypeConfig<LookupProps>> {
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
