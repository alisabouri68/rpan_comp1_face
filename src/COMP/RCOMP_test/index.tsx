// AdvancedInputWidgetTest.tsx
import React, { useState, useRef, useEffect } from 'react';
import AdvancedInputWidget, { 
  AdvancedInputWidgetRef,
  ValidationResult
} from '../../WIDG/RWIDG_test/index';
import { SidebarControl } from './assistant';
import { DynaMan } from "../../RACT/RACT_dynaMan_V00.04/index";

const AdvancedInputWidgetTest: React.FC = () => {
  const widgetRef = useRef<AdvancedInputWidgetRef>(null);
  const widgetId = 'advanced-input-widget-test';
  
  // State برای پراپس‌ها
  const [geometric, setGeometric] = useState<Record<string, any>>({});
  const [logic, setLogic] = useState<Record<string, any>>({});
  const [style, setStyle] = useState<Record<string, any>>({});
  
  // State برای نمایش وضعیت
  const [widgetState, setWidgetState] = useState({
    currentValue: '',
    isValid: true,
    isFocused: false,
    lastMethodTested: ''
  });

  // تست اینکه آیا localStorage کار می‌کند
  const testLocalStorage = () => {
    try {
      const testKey = 'test-storage';
      const testValue = { test: 'data', timestamp: Date.now() };
      localStorage.setItem(testKey, JSON.stringify(testValue));
      const retrieved = localStorage.getItem(testKey);
      return retrieved !== null;
    } catch (e) {
      console.error('localStorage کار نمی‌کند:', e);
      return false;
    }
  };

// AdvancedInputWidgetTest.tsx - قسمت useEffect اولیه رو اینطوری اصلاح کن
useEffect(() => {
  console.log('localStorage کار می‌کند؟', testLocalStorage());

  // 1. اول پیکربندی DynaManager رو انجام بدیم
  console.log('پیکربندی DynaManager برای:', `ENVI_COMP:${widgetId}`);
  
  DynaMan.configurePersist([
    {
      path: `ENVI_COMP:${widgetId}`,
      key: `ENVI_COMP:${widgetId}`,
      layers: ['local'],
      ttlMs: 24 * 60 * 60 * 1000,
      
    }
  ]);

  // 2. حالا داده‌ها رو بارگیری کنیم
  const loadInitialState = async () => {
    try {
      console.log('در حال بارگیری از DynaMan برای مسیر:', `ENVI_COMP:${widgetId}`);
      
      // تست: ببینیم localStorage مستقیم چه داره
      const lsData = localStorage.getItem(`ENVI_COMP:${widgetId}`);
      console.log('داده localStorage مستقیم:', lsData);
      
      // بارگیری از DynaMan
      const saved = await DynaMan.get(`ENVI_COMP:,${widgetId}`);
      console.log('داده بازیابی شده از DynaMan:', saved);
      
      // استخراج داده واقعی
      let actualData = null;
      
      if (saved) {
        // اگر ساختار DynaMan داره
        if (saved.__dyna_meta && saved.value !== undefined) {
          actualData = saved.value;
          console.log('داده از __dyna_meta.value استخراج شد:', actualData);
        } else {
          // ممکنه مستقیم داده باشه
          actualData = saved;
          console.log('داده مستقیم هست:', actualData);
        }
      }
      
      if (actualData) {
        console.log('در حال اعمال داده بارگیری شده...');
        
        if (actualData.geometric && Object.keys(actualData.geometric).length > 0) {
          console.log('اعمال geometric:', actualData.geometric);
          setGeometric(actualData.geometric);
        }
        
        if (actualData.logic && Object.keys(actualData.logic).length > 0) {
          console.log('اعمال logic:', actualData.logic);
          setLogic(actualData.logic);
        }
        
        if (actualData.style && Object.keys(actualData.style).length > 0) {
          console.log('اعمال style:', actualData.style);
          setStyle(actualData.style);
        }
        
        if (actualData.widgetState) {
          console.log('اعمال widgetState:', actualData.widgetState);
          setWidgetState(prev => ({ ...prev, ...actualData.widgetState }));
        }
        
        console.log('بارگیری کامل شد!');
      } else {
        console.log('هیچ داده‌ای برای بارگیری وجود ندارد');
      }
    } catch (error) {
      console.error('خطا در بارگذاری state اولیه:', error);
    }
  };

  loadInitialState();

  // subscribe به تغییرات
  const unsubscribe = DynaMan.subscribe((value) => {
    console.log('تغییر در DynaManager برای مسیر', `ENVI_COMP:${widgetId}:`, value);
  }, `ENVI_COMP:${widgetId}`);

  return () => unsubscribe();
}, [widgetId]);

  // مدیریت تست متدها
  const handleMethodTest = async (method: string) => {
    if (!widgetRef.current) {
      alert('ویجت ref موجود نیست');
      return;
    }

    setWidgetState(prev => ({ ...prev, lastMethodTested: method }));

    try {
      switch (method) {
        case 'getValue':
          const value = widgetRef.current.getValue();
          alert(`مقدار فعلی: ${value}`);
          break;
          
        case 'setValue':
          const newValue = prompt('مقدار جدید را وارد کنید:', 'مقدار تستی');
          if (newValue !== null) {
            widgetRef.current.setValue(newValue);
            setWidgetState(prev => ({ ...prev, currentValue: newValue }));
          }
          break;
          
        case 'validate':
          const result = widgetRef.current.validate();
          alert(`اعتبارسنجی: ${result.isValid ? 'معتبر' : 'نامعتبر'} - ${result.message || ''}`);
          setWidgetState(prev => ({ ...prev, isValid: result.isValid }));
          break;
          
        case 'reset':
          widgetRef.current.reset();
          setWidgetState(prev => ({ ...prev, currentValue: '' }));
          break;
          
        case 'submit':
          widgetRef.current.submit();
          break;
          
        case 'focus':
          widgetRef.current.focus();
          setWidgetState(prev => ({ ...prev, isFocused: true }));
          break;
          
        case 'blur':
          widgetRef.current.blur();
          setWidgetState(prev => ({ ...prev, isFocused: false }));
          break;
          
        case 'clear':
          widgetRef.current.clear();
          setWidgetState(prev => ({ ...prev, currentValue: '' }));
          break;
          
        case 'getValidity':
          const isValid = widgetRef.current.getValidity();
          alert(`وضعیت اعتبار: ${isValid ? 'معتبر' : 'نامعتبر'}`);
          setWidgetState(prev => ({ ...prev, isValid }));
          break;
      }
    } catch (error) {
      console.error(`خطا در اجرای متد ${method}:`, error);
      alert(`خطا در اجرای متد ${method}`);
    }
  };

  // اعمال پیش‌تنظیم‌ها
  const handlePresetApply = (preset: string) => {
    console.log('اعمال پیش‌تنظیم:', preset);
    
    switch (preset) {
      case 'text':
        setGeometric({ inputHeight: '40px', width: '100%' });
        setLogic({ 
          type: 'text', 
          label: 'فیلد متن معمولی',
          placeholder: 'متن خود را وارد کنید...' 
        });
        break;
        
      case 'password':
        setGeometric({ inputHeight: '40px', width: '100%' });
        setLogic({ 
          type: 'password', 
          label: 'رمز عبور',
          placeholder: 'رمز عبور خود را وارد کنید...',
          showPasswordToggle: true 
        });
        break;
        
      case 'email':
        setGeometric({ inputHeight: '40px', width: '100%' });
        setLogic({ 
          type: 'email', 
          label: 'ایمیل',
          placeholder: 'example@domain.com',
          required: true 
        });
        break;
        
      case 'disabled':
        setLogic({ disabled: true });
        break;
        
      case 'readonly':
        setLogic({ readOnly: true });
        break;
    }
  };

  // مدیریت export/import state
  const handleExportState = () => {
    const stateToExport = {
      geometric,
      logic,
      style,
      widgetState,
      timestamp: new Date().toISOString(),
      widgetId
    };
    
    const json = JSON.stringify(stateToExport, null, 2);
    
    // هم در کلیپ‌برد کپی کنیم و هم نمایش دهیم
    navigator.clipboard.writeText(json);
    
    // همچنین فایل دانلود کنیم
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `widget-state-${widgetId}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('State به کلیپ‌برد کپی شد و فایل دانلود شد!');
  };

  const handleImportState = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        try {
          const imported = JSON.parse(e.target.result);
          console.log('فایل وارد شده:', imported);
          
          if (imported.geometric) setGeometric(imported.geometric);
          if (imported.logic) setLogic(imported.logic);
          if (imported.style) setStyle(imported.style);
          if (imported.widgetState) {
            setWidgetState(prev => ({ ...prev, ...imported.widgetState }));
          }
          
          alert('State با موفقیت وارد شد!');
        } catch (error) {
          console.error('خطا در پردازش JSON:', error);
          alert('خطا در پردازش فایل JSON!');
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  };

  const handleClearStorage = () => {
    try {
      // پاک کردن از localStorage
      localStorage.removeItem(`ENVI_COMP:${widgetId}`);
      
      // پاک کردن از DynaManager
      DynaMan.set(`ENVI_COMP:${widgetId}`, null);
      
      // ریست stateها
      setGeometric({});
      setLogic({});
      setStyle({});
      setWidgetState({
        currentValue: '',
        isValid: true,
        isFocused: false,
        lastMethodTested: ''
      });
      
      alert('ذخیره‌سازی پاک شد!');
    } catch (error) {
      console.error('خطا در پاک کردن ذخیره‌سازی:', error);
      alert('خطا در پاک کردن ذخیره‌سازی!');
    }
  };

  // اعتبارسنجی تستی
  const createTestValidator = (minLength: number = 3) => {
    return (value: string): ValidationResult => {
      if (value.length < minLength) {
        return {
          isValid: false,
          message: `حداقل ${minLength} کاراکتر لازم است`,
          errorCode: 'MIN_LENGTH'
        };
      }
      return {
        isValid: true,
        message: 'مقدار معتبر است'
      };
    };
  };

  // بررسی وضعیت localStorage
  const checkStorageStatus = () => {
    const stored = localStorage.getItem(`ENVI_COMP:${widgetId}`);
    return stored ? 'داده ذخیره شده موجود است' : 'هیچ داده‌ای ذخیره نشده';
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* سایدبار کنترل‌ها */}
      <SidebarControl
        widgetId={widgetId}
        onGeometricChange={(value) => setGeometric(prev => ({ ...prev, ...value }))}
        onLogicChange={(value) => setLogic(prev => ({ ...prev, ...value }))}
        onStyleChange={(value) => setStyle(prev => ({ ...prev, ...value }))}
        onMethodTest={handleMethodTest}
        onPresetApply={handlePresetApply}
        onExportState={handleExportState}
        onImportState={handleImportState}
        onClearStorage={handleClearStorage}
      />

      {/* بخش نمایش ویجت */}
      <div style={{ 
        flex: 1, 
        padding: '40px',
        backgroundColor: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflowY: 'auto'
      }}>
        <h1 style={{ marginBottom: '30px' }}>پیش‌نمایش ویجت با DynaManager</h1>
        
        <div style={{ 
          width: '80%',
          maxWidth: '600px',
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <AdvancedInputWidget
            ref={widgetRef}
            geometric={geometric}
            logic={{
              ...logic,
              validator: createTestValidator(3),
            }}
            style={style}
            event={{
              onChange: (_: any, value: string) => {
                setWidgetState(prev => ({ ...prev, currentValue: value }));
              },
              onFocus: () => {
                setWidgetState(prev => ({ ...prev, isFocused: true }));
              },
              onBlur: () => {
                setWidgetState(prev => ({ ...prev, isFocused: false }));
              },
              onSubmit: (value: string) => {
                alert(`ارسال شد: ${value}`);
              },
              onReset: () => {
                alert('ریست شد');
              }
            }}
          />
        </div>

        {/* نمایش وضعیت فعلی */}
        <div style={{ 
          width: '80%',
          maxWidth: '600px',
          padding: '20px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h3>وضعیت فعلی ویجت</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            marginTop: '10px'
          }}>
            <div>
              <strong>مقدار فعلی:</strong>
              <div style={{ 
                padding: '8px',
                backgroundColor: '#f5f5f5',
                borderRadius: '4px',
                marginTop: '5px',
                fontFamily: 'monospace',
                minHeight: '36px'
              }}>
                {widgetState.currentValue || '(خالی)'}
              </div>
            </div>
            
            <div>
              <strong>وضعیت فوکوس:</strong>
              <div style={{ 
                padding: '8px',
                backgroundColor: widgetState.isFocused ? '#e8f5e9' : '#f5f5f5',
                borderRadius: '4px',
                marginTop: '5px',
                color: widgetState.isFocused ? '#2e7d32' : '#666'
              }}>
                {widgetState.isFocused ? 'فوکوس دارد' : 'فوکوس ندارد'}
              </div>
            </div>

            <div>
              <strong>وضعیت اعتبار:</strong>
              <div style={{ 
                padding: '8px',
                backgroundColor: widgetState.isValid ? '#e8f5e9' : '#f8d7da',
                borderRadius: '4px',
                marginTop: '5px',
                color: widgetState.isValid ? '#2e7d32' : '#721c24'
              }}>
                {widgetState.isValid ? 'معتبر' : 'نامعتبر'}
              </div>
            </div>

            <div>
              <strong>وضعیت ذخیره‌سازی:</strong>
              <div style={{ 
                padding: '8px',
                backgroundColor: '#e3f2fd',
                borderRadius: '4px',
                marginTop: '5px',
                fontSize: '12px'
              }}>
                {checkStorageStatus()}
              </div>
            </div>
          </div>

          {/* دکمه‌های تست سریع */}
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => handleMethodTest('getValue')}
              style={{ padding: '6px 12px', fontSize: '14px' }}
            >
              دریافت مقدار
            </button>
            <button 
              onClick={() => handleMethodTest('setValue')}
              style={{ padding: '6px 12px', fontSize: '14px' }}
            >
              تنظیم مقدار
            </button>
            <button 
              onClick={() => handleMethodTest('validate')}
              style={{ padding: '6px 12px', fontSize: '14px' }}
            >
              اعتبارسنجی
            </button>
          </div>
        </div>

        {/* اطلاعات DynaManager */}
        <div style={{ 
          width: '80%',
          maxWidth: '600px',
          padding: '15px',
          backgroundColor: '#e3f2fd',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h4 style={{ marginTop: 0 }}>اطلاعات DynaManager:</h4>
          <ul style={{ marginBottom: 0, fontSize: '14px', paddingLeft: '20px' }}>
            <li><strong>مسیر ذخیره‌سازی:</strong> ENVI_COMP:{widgetId}</li>
            <li><strong>لایه‌های ذخیره‌سازی:</strong> local (localStorage)</li>
            <li><strong>TTL:</strong> 24 ساعت</li>
            <li><strong>Debounce Write:</strong> 500ms</li>
            <li>تغییرات در سایدبار به صورت خودکار ذخیره می‌شوند</li>
            <li>با باز کردن مجدد صفحه، تنظیمات قبلی بازیابی می‌شوند</li>
          </ul>
          <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => console.log(localStorage.getItem(`ENVI_COMP:${widgetId}`))}
              style={{ padding: '4px 8px', fontSize: '12px' }}
            >
              بررسی localStorage
            </button>
            <button 
              onClick={() => {
                const stored = localStorage.getItem(`ENVI_COMP:${widgetId}`);
                alert(stored ? `مقدار ذخیره شده:\n${stored}` : 'هیچ داده‌ای ذخیره نشده');
              }}
              style={{ padding: '4px 8px', fontSize: '12px' }}
            >
              نمایش داده ذخیره شده
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedInputWidgetTest;