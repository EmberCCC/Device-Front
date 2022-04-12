/// <reference types="react" />
import { RadioChangeEvent } from './interface';
import { AbstractCheckboxProps } from '../checkbox/Checkbox';
export declare type RadioButtonProps = AbstractCheckboxProps<RadioChangeEvent>;
declare const RadioButton: (props: RadioButtonProps) => JSX.Element;
export default RadioButton;
