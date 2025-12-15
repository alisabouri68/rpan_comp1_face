// assistance.tsx
import React, { useState, useEffect } from 'react';
import { DynaMan } from 'RACT/RACT_dynaMan_V00.04';
import { SidebarControl } from "../../../../../../COMP/RCOMP_test/assistant";

const Assistance: React.FC = () => {
  const [geometric, setGeometric] = useState({});
  const [logic, setLogic] = useState({});
  const [style, setStyle] = useState({});

  useEffect(() => {
    // تست localStorage و DynaMan
    console.log('DynaMan وجود دارد؟', typeof DynaMan);
    console.log('DynaMan instance:', DynaMan);
    console.log('localStorage کار می‌کند؟', typeof localStorage);
    console.log('کلیدهای localStorage:', Object.keys(localStorage));

    // تست ذخیره‌سازی
    localStorage.setItem('test', 'test-value');
    console.log('تست localStorage:', localStorage.getItem('test'));
    localStorage.removeItem('test');
  }, []);

  // هندلرهای تست
  const handleMethodTest = (method: string) => {
    console.log('تست متد:', method);
    alert(`متد ${method} فراخوانی شد`);
  };

  const handlePresetApply = (preset: string) => {
    console.log('اعمال پیش‌تنظیم:', preset);
    
    switch (preset) {
      case 'text':
        setGeometric({ inputHeight: '40px', width: '100%' });
        setLogic({ 
          type: 'text', 
          label: 'فیلد متن',
          placeholder: 'متن را وارد کنید...' 
        });
        break;
      case 'password':
        setGeometric({ inputHeight: '40px', width: '100%' });
        setLogic({ 
          type: 'password', 
          label: 'رمز عبور',
          placeholder: 'رمز عبور را وارد کنید...',
          showPasswordToggle: true 
        });
        break;
    }
  };

  const handleExportState = () => {
    const state = { geometric, logic, style };
    const json = JSON.stringify(state, null, 2);
    navigator.clipboard.writeText(json);
    alert('State به کلیپ‌برد کپی شد!');
  };

  const handleImportState = () => {
    const json = prompt('JSON state را وارد کنید:');
    if (json) {
      try {
        const imported = JSON.parse(json);
        if (imported.geometric) setGeometric(imported.geometric);
        if (imported.logic) setLogic(imported.logic);
        if (imported.style) setStyle(imported.style);
        alert('State با موفقیت وارد شد!');
      } catch (error) {
        alert('خطا در پردازش JSON!');
      }
    }
  };

  const handleClearStorage = () => {
    localStorage.clear();
    alert('همه ذخیره‌سازی‌ها پاک شدند!');
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* سایدبار کنترل‌ها */}
      <SidebarControl
        widgetId="assistance-widget"
        onGeometricChange={setGeometric}
        onLogicChange={setLogic}
        onStyleChange={setStyle}
        onMethodTest={handleMethodTest}
        onPresetApply={handlePresetApply}
        onExportState={handleExportState}
        onImportState={handleImportState}
        onClearStorage={handleClearStorage}
      />
    
    </div>
  );
};

export default Assistance;