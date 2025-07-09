import { useSelector, useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch();
export const useAppSelector = (selector) => useSelector(selector);