import { useState, useEffect, useRef } from 'react';

function useOutsideMouseUp<T>(callback: (e?: MouseEvent) => void) {
  const [isMouseInside, setIsMouseInside] = useState(true);
  const elementRef = useRef<T|null>(null);

  useEffect(() => {
    // 定义全局的 mouseup 事件处理器
    const handleMouseUp = () => {
      if (!isMouseInside && elementRef.current) {
        callback();
      }
    };

    // 在组件挂载时添加全局事件监听
    document.addEventListener('mouseup', handleMouseUp);

    // 在组件卸载时移除全局事件监听
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMouseInside, callback]);

  const handleMouseEnter = () => {
    setIsMouseInside(true);
  };

  const handleMouseLeave = () => {
    setIsMouseInside(false);
  };

  return {
    ref: elementRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };
}

export default useOutsideMouseUp;
