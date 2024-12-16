export interface Validator {
    name: string;
    validator: any;
    message: string;
}

export interface Option {
    id: string;
    value: string;
}

export interface FieldConfig {
    label: string;
    name: string;
    inputType?: string;
    options?: string[];
    collections?: any;
    readonly?: boolean;
    type: Widget;
    value?: any;
    validations?: Validator[];
    showOnCondition: boolean;
    required?: boolean;
    advanced?: boolean;
}

export type Widget = 'input' | 'select' | 'date';