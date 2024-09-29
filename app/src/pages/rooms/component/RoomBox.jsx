import styles from './roombox.module.css';

import { timeAgo } from '../../../utils/date';

export const RoomBox = ({ data, onClick }) => {
  return (
    <div className={styles.box} onClick={onClick}>
      <div className={styles.box_avatar}>
        <img src={data.product.image}></img>
      </div>
      <div className={styles.box_info}>
        <div className={styles.box_user}>
          <div>{data.opponent.username}</div>
          <div>{timeAgo(data.last_msg_time)}</div>
        </div>
        <div className={styles.box_message}>{data.last_msg}</div>
      </div>
    </div>
  );
};
