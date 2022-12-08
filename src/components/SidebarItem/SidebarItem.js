import classNames from 'classnames/bind';
import styles from './SidebarItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function SidebarItem(
    {
        icon,
        className, 
        title,
        to, 
        active = false,
        ...props
    }
    ) {

        const classes = cx('wrapper', {
            [className]: className,
            active
        });
    return ( <>
        <Link className={cx('wrapper', classes)} to={to}>
            <div className={cx('icon-wrapper')}>
                {icon}
            </div>
            <div className={cx('title-wrapper')}>
                <span className={cx('title')}>{title}</span>
            </div>
        </Link>
    </> );
}

export default SidebarItem;