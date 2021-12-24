import styles from './modal.module.css'

const Modal = props => {
  const { children, onDismiss } = props
  return (
    <div className={styles.modal}>
      {children}
      <button onClick={onDismiss}>Close</button>
    </div>
  )
}

export default Modal
