import './index.css'

const LanguageFilterItem = props => {
  const {itemDetails, clicked, activeId} = props
  const {id, language} = itemDetails
  const classAdd = activeId ? 'active' : ''
  const clickedEvent = () => {
    clicked(id)
  }

  return (
    <li className="list-item">
      <button
        type="button"
        onClick={clickedEvent}
        className={`list-button ${classAdd}`}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
