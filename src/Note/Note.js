import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'

export default function Note(props) {
  //delete API call 
  // const handleClickDelete = e => {
  //   e.preventDefault()
  //   const noteId = this.props.id

  //   fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'content-type': 'application/json'
  //     },
  //   })
  //     .then(res => {
  //       if (!res.ok)
  //         return res.json().then(e => Promise.reject(e))
  //       return res.json()
  //     })
  //     .then(() => {
  //       this.context.deleteNote(noteId)
  //       // allow parent to perform extra behaviour
  //       this.props.onDeleteNote(noteId)
  //     })
  //     .catch(error => {
  //       console.error({ error })
  //     })
  // }
  return (
    <div className='Note'>
      <h2 className='Note__title'>
        <Link to={`/note/${props.id}`}>
          {props.name}
        </Link>
      </h2>
      <button className='Note__delete' type='button'>
        <FontAwesomeIcon icon='trash-alt' />
        {' '}
        remove
      </button>
      <div className='Note__dates'>
        <div className='Note__dates-modified'>
          Modified
          {' '}
          <span className='Date'>
            {format(props.modified, 'Do MMM YYYY')}
          </span>
        </div>
      </div>
    </div>
  )
}
