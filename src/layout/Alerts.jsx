import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from '../app/slices/alertSlice';
import check from "../assets/img/check.png";

export default function Alerts() {
  const alert = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alert.isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideAlert());
      }, 8000); 

      return () => clearTimeout(timer); 
    }
  }, [alert.isVisible, dispatch]);

  if (!alert.isVisible) {
    return null;
  }

  return (
    <div className={`alert alert-${alert.type}`} role="alert">
      <p><img src={check} alt="check icon" />{alert.message}</p>
      <button type="button" className="close" onClick={() => dispatch(hideAlert())}>&times;</button>
    </div>
  );
}