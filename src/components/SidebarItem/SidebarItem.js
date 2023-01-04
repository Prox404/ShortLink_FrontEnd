import classNames from 'classnames/bind';
import styles from './SidebarItem.module.scss';
import { Link } from 'react-router-dom';
import { forwardRef } from 'react';

const cx = classNames.bind(styles);

const SidebarItem = forwardRef((
    {
        icon,
        className, 
        title,
        to,
        onClick, 
        active = false,
        ...props
    }, ref
    ) => {

        const classes = cx('wrapper', {
            [className]: className,
            active
        });
    return ( <>
        <Link ref={ref} className={cx('wrapper', classes)} to={to} onClick={onClick}>
            <div className={cx('icon-wrapper')}>
                {icon}
            </div>
            <div className={cx('title-wrapper')}>
                <span className={cx('title')}>{title}</span>
            </div>
        </Link>
    </> );
});

export default  SidebarItem;