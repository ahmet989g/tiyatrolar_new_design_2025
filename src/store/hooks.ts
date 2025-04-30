import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// Redux'un orijinal hook'ları yerine bu tiplendirilmiş versiyonları kullanacağız. (TypeScript'in tip güvenliğinden faydalanmak için)
// useAppDispatch: TypeScript, hangi aksiyonları gönderebileceğinizi bilerek otomatik tamamlama sağlar.
// useAppSelector: Redux state'inizin yapısını bildiği için, seçiciler yazarken tip hatalarını önler.
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;