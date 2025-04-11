import { useDispatch, useSelector } from 'react-redux'
import { TAppDispatch, TRootState } from '.'

export const useAppDispatch = useDispatch.withTypes<TAppDispatch>()
export const useAppSelector = useSelector.withTypes<TRootState>()