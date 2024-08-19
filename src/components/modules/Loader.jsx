import styles from "./Loader.module.css"

function Loader({ fullScreen }) {
  return (
    <div className={fullScreen ? styles.fullScreencontainer : styles.container}>
      <span ></span>
    </div>
  )
}

export default Loader