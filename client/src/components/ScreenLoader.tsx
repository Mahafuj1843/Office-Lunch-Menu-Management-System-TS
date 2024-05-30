import {Fragment} from 'react';
import { useAppSelector } from '../store/store';

const ScreenLoader = () => {
    const loader: string = useAppSelector((state)=>state.setting.loader)
    
    return (
        <Fragment>
            <div className="LoadingOverlay" style={{display: loader}}>
                <div className="Line-Progress">
                    <div className="indeterminate"></div>
                </div>
            </div>
        </Fragment>
    );
};
export default ScreenLoader;