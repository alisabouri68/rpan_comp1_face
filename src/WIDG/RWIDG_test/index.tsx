//@ts-nocheck
import React, { 
  useState, 
  useEffect, 
  forwardRef, 
  useImperativeHandle,
  CSSProperties,
  ReactNode,
  KeyboardEvent,
  FocusEvent,
  ChangeEvent
} from 'react';

// 1. تعریف انواع (Types) برای هر یک از شیءها

// انواع هندسی
export interface GeometricProps {
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'grid' | 'none';
  inputHeight?: string;
  inputWidth?: string;
  containerWidth?: string;
  containerHeight?: string;
  zIndex?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

// انواع منطقی
export interface LogicProps {
  // نوع اینپوت
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local';
  
  // شناسه و برچسب
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  
  // مقدار و وضعیت
  initialValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  
  // محدودیت‌ها
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
  
  // اعتبارسنجی
  validator?: (value: string) => ValidationResult;
  realtimeValidation?: boolean;
  
  // تنظیمات دکمه‌ها
  showSubmitButton?: boolean;
  submitButtonText?: string;
  showResetButton?: boolean;
  resetButtonText?: string;
  submitOnEnter?: boolean;
  
  // سایر تنظیمات
  autoComplete?: 'on' | 'off' | 'name' | 'email' | 'username' | 'current-password' | 'new-password';
  helperText?: string;
  errorMessage?: string;
  
  // حالت‌های خاص
  isLoading?: boolean;
  isSuccess?: boolean;
  rows?: number; // برای textarea
  
  // تنظیمات پیشرفته
  debounceTime?: number;
  trimOnBlur?: boolean;
  forceUppercase?: boolean;
  forceLowercase?: boolean;
}

// نتیجه اعتبارسنجی
export interface ValidationResult {
  isValid: boolean;
  message?: string;
  errorCode?: string;
}

// انواع استایل
export interface StyleProps {
  // استایل عمومی
  fontSize?: string;
  fontFamily?: string;
  color?: string;
  backgroundColor?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
  focusBorderColor?: string;
  errorBorderColor?: string;
  successBorderColor?: string;
  transition?: string;
  
  // پدینگ و مارژین
  inputPadding?: string;
  inputMargin?: string;
  containerPadding?: string;
  containerMargin?: string;
  
  // استایل‌های خاص
  containerStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  helperTextStyle?: CSSProperties;
  errorMessageStyle?: CSSProperties;
  charCounterStyle?: CSSProperties;
  submitButtonStyle?: CSSProperties;
  resetButtonStyle?: CSSProperties;
  actionButtonsStyle?: CSSProperties;
  
  // آیکون‌ها
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  clearIcon?: ReactNode;
  clearButton?: boolean;
  clearButtonStyle?: CSSProperties;
  
  // ویژگی‌های خاص
  showCharCount?: boolean;
  showPasswordToggle?: boolean;
  passwordShowIcon?: ReactNode;
  passwordHideIcon?: ReactNode;
  loadingIndicator?: ReactNode;
  successIndicator?: ReactNode;
  
  // کلاس‌های CSS
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  helperTextClassName?: string;
  errorMessageClassName?: string;
  
  // استایل‌های شرطی
  disabledStyle?: CSSProperties;
  readOnlyStyle?: CSSProperties;
  focusStyle?: CSSProperties;
}

// انواع متد
export interface MethodProps {
  onSubmit?: (value: string) => void;
  onReset?: () => void;
  onValidate?: (result: ValidationResult) => void;
  onValueChange?: (value: string) => void;
  onFormattedValueChange?: (value: string) => void;
  formatValue?: (value: string) => string;
  parseValue?: (value: string) => string;
}

// انواع رویداد
export interface EventProps {
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit?: (value: string) => void;
  onReset?: () => void;
  onInvalid?: (validationResult: ValidationResult) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyUp?: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onDoubleClick?: (event: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

// Props اصلی کامپوننت
export interface AdvancedInputWidgetProps {
  geometric?: GeometricProps;
  logic?: LogicProps;
  style?: StyleProps;
  method?: MethodProps;
  event?: EventProps;
  
  // props عمومی
  className?: string;
}

// Ref متدها
export interface AdvancedInputWidgetRef {
  getValue: () => string;
  setValue: (value: string) => void;
  validate: () => ValidationResult;
  reset: () => void;
  submit: () => void;
  focus: () => void;
  blur: () => void;
  clear: () => void;
  getValidity: () => boolean;
}

// 2. کامپوننت اصلی
const AdvancedInputWidget = forwardRef<AdvancedInputWidgetRef, AdvancedInputWidgetProps>(({
  geometric = {},
  logic = {},
  style = {},
  method = {},
  event = {},
  className = '',
  ...props
}, ref) => {
  // Stateها
  const [value, setValue] = useState<string>(logic.initialValue || '');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [touched, setTouched] = useState<boolean>(false);
  
  // Ref برای المنت اینپوت
  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  
  // اعتبارسنجی مقدار
  useEffect(() => {
    if (logic.validator && value && (touched || logic.realtimeValidation)) {
      const validationResult = logic.validator(value);
      setIsValid(validationResult.isValid);
      if (validationResult.isValid === false) {
        setError(validationResult.message || logic.errorMessage || 'مقدار وارد شده معتبر نیست');
        if (method.onValidate) {
          method.onValidate(validationResult);
        }
      } else {
        setError(null);
      }
    }
  }, [value, touched, logic.validator, logic.realtimeValidation, logic.errorMessage, method.onValidate]);
  
  // فرمت مقدار در صورت نیاز
  useEffect(() => {
    if (method.formatValue && value) {
      const formattedValue = method.formatValue(value);
      if (formattedValue !== value) {
        setValue(formattedValue);
        if (method.onFormattedValueChange) {
          method.onFormattedValueChange(formattedValue);
        }
      }
    }
  }, [value, method.formatValue, method.onFormattedValueChange]);
  
  // مدیریت فوکوس
  const handleFocus = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(true);
    setTouched(true);
    if (event.onFocus) event.onFocus(e);
  };
  
  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false);
    
    // Trim مقدار در صورت نیاز
    if (logic.trimOnBlur) {
      const trimmedValue = value.trim();
      if (trimmedValue !== value) {
        setValue(trimmedValue);
      }
    }
    
    // تبدیل به حروف بزرگ/کوچک در صورت نیاز
    if (logic.forceUppercase) {
      const uppercasedValue = value.toUpperCase();
      if (uppercasedValue !== value) {
        setValue(uppercasedValue);
      }
    }
    
    if (logic.forceLowercase) {
      const lowercasedValue = value.toLowerCase();
      if (lowercasedValue !== value) {
        setValue(lowercasedValue);
      }
    }
    
    if (event.onBlur) event.onBlur(e);
  };
  
  // مدیریت تغییر مقدار
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    if (method.onValueChange) {
      method.onValueChange(newValue);
    }
    
    if (event.onChange) event.onChange(e, newValue);
  };
  
  // مدیریت ارسال
  const handleSubmit = () => {
    if (logic.validator) {
      const validationResult = logic.validator(value);
      if (validationResult.isValid === false) {
        setError(validationResult.message || logic.errorMessage || 'مقدار وارد شده معتبر نیست');
        setIsValid(false);
        if (event.onInvalid) event.onInvalid(validationResult);
        return;
      }
    }
    
    setIsValid(true);
    setError(null);
    
    if (event.onSubmit) event.onSubmit(value);
    if (method.onSubmit) method.onSubmit(value);
  };
  
  // مدیریت ریست
  const handleReset = () => {
    setValue(logic.initialValue || '');
    setError(null);
    setIsValid(true);
    setTouched(false);
    
    if (event.onReset) event.onReset();
    if (method.onReset) method.onReset();
  };
  
  // مدیریت کلیک
  const handleClick = (e: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.onClick) event.onClick(e);
  };
  
  // مدیریت دابل کلیک
  const handleDoubleClick = (e: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.onDoubleClick) event.onDoubleClick(e);
  };
  
  // مدیریت کیبورد
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && logic.submitOnEnter) {
      e.preventDefault();
      handleSubmit();
    }
    
    if (event.onKeyDown) event.onKeyDown(e);
  };
  
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.onKeyUp) event.onKeyUp(e);
  };
  
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.onKeyPress) event.onKeyPress(e);
  };
  
  // نمایش/مخفی کردن رمز
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  // پاک کردن مقدار
  const handleClear = () => {
    setValue('');
    setError(null);
    setIsValid(true);
    
    // فوکوس روی اینپوت بعد از پاک کردن
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // متدهای قابل دسترسی از خارج
  useImperativeHandle(ref, () => ({
    getValue: () => value,
    setValue: (newValue: string) => setValue(newValue),
    validate: () => {
      if (logic.validator) {
        const validationResult = logic.validator(value);
        setIsValid(validationResult.isValid);
        if (validationResult.isValid === false) {
          setError(validationResult.message || logic.errorMessage || 'مقدار وارد شده معتبر نیست');
          return validationResult;
        } else {
          setError(null);
          return validationResult;
        }
      }
      return { isValid: true, message: '' };
    },
    reset: handleReset,
    submit: handleSubmit,
    focus: () => {
      if (inputRef.current) inputRef.current.focus();
    },
    blur: () => {
      if (inputRef.current) inputRef.current.blur();
    },
    clear: handleClear,
    getValidity: () => isValid
  }));
  
  // تعیین نوع اینپوت بر اساس منطق
  const getInputType = () => {
    if (logic.type === 'password') {
      return isPasswordVisible ? 'text' : 'password';
    }
    return logic.type || 'text';
  };
  
  // محاسبه استایل‌های هندسی
  const containerStyle: CSSProperties = {
    width: geometric.containerWidth || geometric.width || '100%',
    height: geometric.containerHeight || geometric.height || 'auto',
    margin: geometric.margin || style.containerMargin || '0',
    padding: geometric.padding || style.containerPadding || '0',
    position: geometric.position || 'relative',
    display: geometric.display || 'block',
    zIndex: geometric.zIndex,
    top: geometric.top,
    left: geometric.left,
    right: geometric.right,
    bottom: geometric.bottom,
    ...style.containerStyle,
    ...props.style 
  };
  
  const inputStyle: CSSProperties = {
    width: geometric.inputWidth || '100%',
    height: geometric.inputHeight || (logic.rows ? 'auto' : '40px'),
    fontSize: style.fontSize || '16px',
    fontFamily: style.fontFamily || 'inherit',
    color: style.color || '#000',
    backgroundColor: style.backgroundColor || '#fff',
    borderColor: !isValid ? style.errorBorderColor || '#f00' : 
                isFocused ? style.focusBorderColor || '#00f' : 
                style.borderColor || '#ccc',
    borderRadius: style.borderRadius || '4px',
    borderWidth: style.borderWidth || '1px',
    borderStyle: style.borderStyle || 'solid',
    padding: style.inputPadding || '8px 12px',
    margin: style.inputMargin || '0',
    transition: style.transition || 'all 0.2s ease',
    ...(logic.disabled && style.disabledStyle),
    ...(logic.readOnly && style.readOnlyStyle),
    ...(isFocused && style.focusStyle),
    ...style.inputStyle
  };
  
  // رندر محتوای اضافی
  const renderAddons = () => {
    const addons: ReactNode[] = [];
    
    // آیکون اولیه
    if (style.prefixIcon) {
      addons.push(
        <div key="prefix" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
          {style.prefixIcon}
        </div>
      );
    }
    
    // دکمه نمایش/مخفی رمز
    if (logic.type === 'password' && style.showPasswordToggle) {
      addons.push(
        <button
          key="password-toggle"
          type="button"
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0'
          }}
          onClick={togglePasswordVisibility}
          tabIndex={-1}
        >
          {isPasswordVisible ? 
            (style.passwordHideIcon || '🙈') : 
            (style.passwordShowIcon || '👁️')}
        </button>
      );
    }
    
    // آیکون ثانویه
    if (style.suffixIcon) {
      addons.push(
        <div key="suffix" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
          {style.suffixIcon}
        </div>
      );
    }
    
    // دکمه پاک کردن
    if (value && style.clearButton) {
      addons.push(
        <button
          key="clear"
          type="button"
          style={{
            position: 'absolute',
            right: style.suffixIcon || (logic.type === 'password' && style.showPasswordToggle) ? '40px' : '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0',
            ...style.clearButtonStyle
          }}
          onClick={handleClear}
          tabIndex={-1}
        >
          {style.clearIcon || '✕'}
        </button>
      );
    }
    
    return addons.length > 0 ? addons : null;
  };
  
  // تعیین اینکه آیا textarea است یا input
  const isTextarea = logic.rows && logic.rows > 1;
  
  return (
    <div 
      className={`advanced-input-container ${className} ${style.containerClassName || ''}`}
      style={containerStyle}
    >
      {/* برچسب */}
      {logic.label && (
        <label 
          htmlFor={logic.id || 'advanced-input'} 
          className={`input-label ${style.labelClassName || ''}`}
          style={{
            display: 'block',
            marginBottom: '6px',
            fontWeight: 500,
            ...style.labelStyle
          }}
        >
          {logic.label}
          {logic.required && (
            <span style={{ color: style.errorBorderColor || '#f00', marginLeft: '4px' }}>*</span>
          )}
        </label>
      )}
      
      {/* توضیح */}
      {logic.helperText && (
        <div 
          className={`helper-text ${style.helperTextClassName || ''}`}
          style={{
            fontSize: '12px',
            color: '#666',
            marginBottom: '6px',
            ...style.helperTextStyle
          }}
        >
          {logic.helperText}
        </div>
      )}
      
      {/* کانتینر اصلی اینپوت */}
      <div style={{ position: 'relative', width: '100%' }}>
        {renderAddons()}
        
        {isTextarea ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            id={logic.id || 'advanced-input'}
            name={logic.name || logic.id || 'advanced-input'}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onKeyPress={handleKeyPress}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            placeholder={logic.placeholder || ''}
            disabled={logic.disabled || false}
            readOnly={logic.readOnly || false}
            required={logic.required || false}
            maxLength={logic.maxLength}
            minLength={logic.minLength}
            rows={logic.rows}
            autoComplete={logic.autoComplete || 'off'}
            className={`advanced-input ${style.inputClassName || ''}`}
            style={{
              ...inputStyle,
              minHeight: geometric.inputHeight || `${(logic.rows || 3) * 24}px`,
              resize: 'vertical'
            }}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            id={logic.id || 'advanced-input'}
            name={logic.name || logic.id || 'advanced-input'}
            type={getInputType()}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onKeyPress={handleKeyPress}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            placeholder={logic.placeholder || ''}
            disabled={logic.disabled || false}
            readOnly={logic.readOnly || false}
            required={logic.required || false}
            maxLength={logic.maxLength}
            minLength={logic.minLength}
            pattern={logic.pattern}
            min={logic.min?.toString()}
            max={logic.max?.toString()}
            step={logic.step?.toString()}
            autoComplete={logic.autoComplete || 'off'}
            className={`advanced-input ${style.inputClassName || ''}`}
            style={inputStyle}
          />
        )}
        
        {/* نشانگر بارگذاری */}
        {logic.isLoading && (
          <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
            {style.loadingIndicator || '⌛'}
          </div>
        )}
        
        {/* نشانگر موفقیت */}
        {logic.isSuccess && !logic.isLoading && (
          <div style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}>
            {style.successIndicator || '✅'}
          </div>
        )}
      </div>
      
      {/* نمایش خطا */}
      {error && (
        <div 
          className={`error-message ${style.errorMessageClassName || ''}`}
          style={{
            fontSize: '12px',
            color: style.errorBorderColor || '#f00',
            marginTop: '4px',
            ...style.errorMessageStyle
          }}
        >
          {error}
        </div>
      )}
      
      {/* نمایش شمارنده کاراکتر */}
      {logic.maxLength && style.showCharCount && (
        <div 
          className="char-counter"
          style={{
            fontSize: '12px',
            textAlign: 'left',
            marginTop: '4px',
            color: value.length > logic.maxLength ? (style.errorBorderColor || '#f00') : '#666',
            ...style.charCounterStyle
          }}
        >
          {value.length}/{logic.maxLength}
        </div>
      )}
      
      {/* دکمه‌های عملیاتی */}
      {(logic.showSubmitButton || logic.showResetButton) && (
        <div 
          className="action-buttons"
          style={{
            marginTop: '10px',
            display: 'flex',
            gap: '8px',
            ...style.actionButtonsStyle
          }}
        >
          {logic.showSubmitButton && (
            <button
              type="button"
              onClick={handleSubmit}
              className="submit-button"
              disabled={logic.disabled || logic.isLoading}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: logic.disabled || logic.isLoading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                backgroundColor: logic.disabled || logic.isLoading ? '#ccc' : '#007bff',
                color: '#fff',
                ...style.submitButtonStyle
              }}
            >
              {logic.isLoading ? 'در حال ارسال...' : logic.submitButtonText || 'ارسال'}
            </button>
          )}
          
          {logic.showResetButton && (
            <button
              type="button"
              onClick={handleReset}
              className="reset-button"
              disabled={logic.disabled || logic.isLoading}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: logic.disabled || logic.isLoading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: 500,
                backgroundColor: '#fff',
                color: '#333',
                ...style.resetButtonStyle
              }}
            >
              {logic.resetButtonText || 'ریست'}
            </button>
          )}
        </div>
      )}
    </div>
  );
});


AdvancedInputWidget.displayName = 'AdvancedInputWidget';

export default AdvancedInputWidget;