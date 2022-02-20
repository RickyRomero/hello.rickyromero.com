import styles from './insignia.module.css'

const Insignia = () => {
  return (
    <div className={styles.insignia}>
      <svg version="1.1" viewBox="0 0 50 76">
        <defs>
          <clipPath id="insignia">
            <path d="m22.547 7.7628c13.098 0 17.852 10.485 17.852 17.532 0 8.8532-4.5371 15.016-12.83 17.529l12.32 33.176h10.111l-11.684-28.6c4.9915-2.8487 11.344-9.343 11.344-22.105 0-14.015-9.7562-25.295-25.411-25.295h-24.249l2.6861 7.7628h19.861z" fill="#000"/>
            <path d="m23.227 40.497 1.8035-0.4128c7.8305-1.7914 11.969-6.916 11.969-14.818 0-4.9339-3.0206-14.266-14.452-14.266h-18.548l2.6603 7.7678h14.202c3.8193 0 6.9659 2.2796 6.9659 6.84 0 4.5605-3.1465 6.9547-6.9659 6.9547h-9.477l14.878 43.438h10.014l-13.05-35.503z" fill="#000" mask="url(#b)"/>
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export default Insignia