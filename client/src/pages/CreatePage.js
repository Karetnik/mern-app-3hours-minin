import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";


export const CreatePage = () => {
  const [link, setLink] = useState('')
  const {request, loading} = useHttp()
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const changeHandler = (event) => {
    setLink(event.target.value)
  }

  const pressHandler = async (event) => {
    if (event.key === 'Enter') {
      const data = await request('/api/link/generate', 'POST', {from: link}, {
        Authorization: `Bearer ${auth.token}`
      })
      navigate(`/details/${data.link._id}`)
    }
  }

  useEffect(() => {
    window.M.updateTextFields()
  })

  return (
    <>
      <h2>Создание ссылки</h2>
      <div className="row">
        <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
          <div className="input-field">
            <input
              type="text"
              name="link"
              id="link"
              onChange={changeHandler}
              value={link}
              onKeyPress={pressHandler}
            />
            <label htmlFor="link">Введите ссылку</label>
          </div>
        </div>
      </div>
    </>
  )
}
