// SidebarControl.tsx
import React, { useEffect, useState } from 'react';
import { GeometricProps, LogicProps, StyleProps } from '../../WIDG/RWIDG_test/index';
import { DynaMan } from "../../RACT/RACT_dynaMan_V00.04/index";

interface SidebarControlProps {
  widgetId: string;
  onGeometricChange: (geometric: Partial<GeometricProps>) => void;
  onLogicChange: (logic: Partial<LogicProps>) => void;
  onStyleChange: (style: Partial<StyleProps>) => void;
  onMethodTest: (method: string) => void;
  onPresetApply: (preset: string) => void;
  onExportState: () => void;
  onImportState: () => void;
  onClearStorage: () => void;
}

export const SidebarControl: React.FC<SidebarControlProps> = ({
  widgetId,
  onGeometricChange,
  onLogicChange,
  onStyleChange,
  onMethodTest,
  onPresetApply,
  onExportState,
  onImportState,
  onClearStorage,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [storageStatus, setStorageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
 
    DynaMan.configurePersist([
      {
        path: `ENVI_COMP:${widgetId}`,
        key: `ENVI_COMP:${widgetId}`,
        layers: ['local'], 
        ttlMs: 24 * 60 * 60 * 1000, 
      }
    ]);

    // بارگذاری state ذخیره شده
    const loadState = async () => {
      try {
        const saved = await DynaMan.get(`ENVI_COMP:${widgetId}`);
        
        if (saved && typeof saved === 'object') {
          console.log('State بارگیری شده از DynaManager:', saved);
          
          // اعمال state بارگیری شده
          if (saved.geometric && typeof saved.geometric === 'object') {
            onGeometricChange(saved.geometric);
          }
          if (saved.logic && typeof saved.logic === 'object') {
            onLogicChange(saved.logic);
          }
          if (saved.style && typeof saved.style === 'object') {
            onStyleChange(saved.style);
          }
          
          setStorageStatus('loaded');
        } else {
          console.log('هیچ state ذخیره‌شده‌ای یافت نشد');
          setStorageStatus('loaded');
        }
      } catch (error) {
        console.error('خطا در بارگذاری state:', error);
        setStorageStatus('error');
      } finally {
        setIsLoaded(true);
      }
    };

    loadState();
  }, [widgetId]);

  const saveCurrentState = async (section: string, value: any) => {
    try {
      // اول state فعلی رو بگیریم
      const currentState = await DynaMan.get(`ENVI_COMP:${widgetId}`) || {};
      
      // state جدید رو بسازیم
      const newState = {
        ...currentState,
        [section]: {
          ...(currentState[section] || {}),
          ...value
        },
        timestamp: new Date().toISOString()
      };
      
      // ذخیره در DynaManager
      DynaMan.set(`ENVI_COMP:${widgetId}`, newState);
      console.log(`State ذخیره شد (${section}):`, newState);
    } catch (error) {
      console.error('خطا در ذخیره state:', error);
    }
  };

  const handleGeometricChange = (value: Partial<GeometricProps>) => {
    onGeometricChange(value);
    saveCurrentState('geometric', value);
  };

  const handleLogicChange = (value: Partial<LogicProps>) => {
    onLogicChange(value);
    saveCurrentState('logic', value);
  };

  const handleStyleChange = (value: Partial<StyleProps>) => {
    onStyleChange(value);
    saveCurrentState('style', value);
  };

  return (
    <div style={{
      width: '350px',
      backgroundColor: '#f5f5f5',
      padding: '20px',
      overflowY: 'auto',
      borderRight: '1px solid #ddd'
    }}>
      <h2 style={{ marginTop: 0 }}>کنترل‌های ویجت</h2>
      
      {/* وضعیت DynaManager */}
      <div style={{ 
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: 
          storageStatus === 'loaded' ? '#e8f5e9' : 
          storageStatus === 'error' ? '#f8d7da' : '#fff3cd',
        borderRadius: '4px',
        border: `1px solid ${
          storageStatus === 'loaded' ? '#c3e6cb' : 
          storageStatus === 'error' ? '#f5c6cb' : '#ffeaa7'
        }`
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong>DynaManager:</strong>
            <span style={{ 
              color: 
                storageStatus === 'loaded' ? '#2e7d32' : 
                storageStatus === 'error' ? '#dc3545' : '#856404',
              marginLeft: '8px'
            }}>
              {storageStatus === 'loading' && 'در حال بارگذاری...'}
              {storageStatus === 'loaded' && 'فعال'}
              {storageStatus === 'error' && 'خطا'}
            </span>
          </div>
          <button 
            onClick={() => {
              // تست ذخیره‌سازی
              saveCurrentState('test', { test: 'test' });
              alert('تست ذخیره‌سازی انجام شد، کنسول را بررسی کنید');
            }}
            style={{ 
              padding: '4px 8px',
              fontSize: '12px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            تست ذخیره
          </button>
        </div>
        <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
          ID: {widgetId}
        </div>
      </div>

      {/* کنترل‌های هندسی */}
      <div style={{ marginBottom: '20px' }}>
        <h3>تنظیمات هندسی</h3>
        
        {[
          { key: 'width', label: 'عرض', type: 'text', defaultValue: '100%' },
          { key: 'height', label: 'ارتفاع', type: 'text', defaultValue: 'auto' },
          { key: 'inputHeight', label: 'ارتفاع اینپوت', type: 'text', defaultValue: '40px' },
          { key: 'inputWidth', label: 'عرض اینپوت', type: 'text', defaultValue: '100%' },
          { key: 'margin', label: 'حاشیه', type: 'text', defaultValue: '0' },
          { key: 'padding', label: 'پدینگ', type: 'text', defaultValue: '0' },
        ].map(({ key, label, type, defaultValue }) => (
          <div key={key} style={{ marginBottom: '10px' }}>
            <label>{label}:</label>
            <input
              type={type}
              placeholder={defaultValue}
              onChange={(e) => {
                handleGeometricChange({ [key]: e.target.value || undefined });
              }}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
        ))}

        <div style={{ marginBottom: '10px' }}>
          <label>موقعیت:</label>
          <select
            onChange={(e) => {
              handleGeometricChange({ position: e.target.value as any });
            }}
            style={{ width: '100%', padding: '5px' }}
          >
            <option value="">انتخاب کنید</option>
            <option value="static">static</option>
            <option value="relative">relative</option>
            <option value="absolute">absolute</option>
            <option value="fixed">fixed</option>
            <option value="sticky">sticky</option>
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>نمایش:</label>
          <select
            onChange={(e) => {
              handleGeometricChange({ display: e.target.value as any });
            }}
            style={{ width: '100%', padding: '5px' }}
          >
            <option value="">انتخاب کنید</option>
            <option value="block">block</option>
            <option value="inline">inline</option>
            <option value="inline-block">inline-block</option>
            <option value="flex">flex</option>
            <option value="grid">grid</option>
            <option value="none">none</option>
          </select>
        </div>
      </div>

      {/* کنترل‌های منطقی */}
      <div style={{ marginBottom: '20px' }}>
        <h3>تنظیمات منطقی</h3>
        
        <div style={{ marginBottom: '10px' }}>
          <label>نوع:</label>
          <select
            onChange={(e) => {
              handleLogicChange({ type: e.target.value as any });
            }}
            style={{ width: '100%', padding: '5px' }}
          >
            <option value="">انتخاب کنید</option>
            <option value="text">text</option>
            <option value="password">password</option>
            <option value="email">email</option>
            <option value="number">number</option>
            <option value="tel">tel</option>
            <option value="url">url</option>
            <option value="search">search</option>
          </select>
        </div>

        {[
          { key: 'label', label: 'برچسب', type: 'text' },
          { key: 'placeholder', label: 'Placeholder', type: 'text' },
          { key: 'helperText', label: 'متن راهنما', type: 'text' },
          { key: 'maxLength', label: 'حداکثر طول', type: 'number' },
          { key: 'submitButtonText', label: 'متن دکمه ارسال', type: 'text' },
          { key: 'resetButtonText', label: 'متن دکمه ریست', type: 'text' },
        ].map(({ key, label, type }) => (
          <div key={key} style={{ marginBottom: '10px' }}>
            <label>{label}:</label>
            <input
              type={type}
              onChange={(e) => {
                const value = type === 'number' ? parseInt(e.target.value) || undefined : e.target.value;
                handleLogicChange({ [key]: value });
              }}
              style={{ width: '100%', padding: '5px' }}
            />
          </div>
        ))}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
          {[
            { key: 'disabled', label: 'غیرفعال' },
            { key: 'readOnly', label: 'فقط خواندنی' },
            { key: 'required', label: 'الزامی' },
            { key: 'showSubmitButton', label: 'نمایش ارسال' },
            { key: 'showResetButton', label: 'نمایش ریست' },
            { key: 'submitOnEnter', label: 'ارسال با Enter' },
          ].map(({ key, label }) => (
            <label key={key} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                onChange={(e) => {
                  handleLogicChange({ [key]: e.target.checked });
                }}
                style={{ marginRight: '5px' }}
              />
              <span style={{ fontSize: '14px' }}>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* کنترل‌های استایل */}
      <div style={{ marginBottom: '20px' }}>
        <h3>تنظیمات استایل</h3>
        
        {[
          { key: 'fontSize', label: 'سایز فونت', type: 'text', defaultValue: '16px' },
          { key: 'color', label: 'رنگ متن', type: 'color', defaultValue: '#000000' },
          { key: 'backgroundColor', label: 'رنگ پس‌زمینه', type: 'color', defaultValue: '#ffffff' },
          { key: 'borderColor', label: 'رنگ حاشیه', type: 'color', defaultValue: '#cccccc' },
          { key: 'focusBorderColor', label: 'رنگ حاشیه فوکوس', type: 'color', defaultValue: '#007bff' },
          { key: 'borderRadius', label: 'گردی گوشه', type: 'text', defaultValue: '4px' },
          { key: 'inputPadding', label: 'پدینگ اینپوت', type: 'text', defaultValue: '8px 12px' },
        ].map(({ key, label, type, defaultValue }) => (
          <div key={key} style={{ marginBottom: '10px' }}>
            <label>{label}:</label>
            {type === 'color' ? (
              <input
                type="color"
                onChange={(e) => {
                  handleStyleChange({ [key]: e.target.value });
                }}
                style={{ width: '100%', height: '30px', padding: '0' }}
              />
            ) : (
              <input
                type="text"
                placeholder={defaultValue}
                onChange={(e) => {
                  handleStyleChange({ [key]: e.target.value || undefined });
                }}
                style={{ width: '100%', padding: '5px' }}
              />
            )}
          </div>
        ))}
      </div>

      {/* دکمه‌های مدیریت state */}
      <div style={{ marginBottom: '20px' }}>
        <h3>مدیریت State</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button 
            onClick={onExportState}
            style={{ padding: '8px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            خروجی JSON
          </button>
          <button 
            onClick={onImportState}
            style={{ padding: '8px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            ورودی JSON
          </button>
          <button 
            onClick={onClearStorage}
            style={{ padding: '8px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', gridColumn: 'span 2' }}
          >
            پاک‌کردن ذخیره‌سازی
          </button>
        </div>
      </div>

      {/* دکمه‌های تست متدها */}
      <div style={{ marginBottom: '20px' }}>
        <h3>تست متدهای Ref</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {['getValue', 'setValue', 'validate', 'reset', 'submit', 'focus', 'blur', 'clear', 'getValidity'].map((method) => (
            <button 
              key={method}
              onClick={() => onMethodTest(method)}
              style={{ padding: '8px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              {method}
            </button>
          ))}
        </div>
      </div>

      {/* دکمه‌های پیش‌تنظیم */}
      <div style={{ marginBottom: '20px' }}>
        <h3>پیش‌تنظیم‌ها</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {['text', 'password', 'email', 'disabled', 'readonly'].map((preset) => (
            <button 
              key={preset}
              onClick={() => onPresetApply(preset)}
              style={{ padding: '8px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              حالت {preset}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};