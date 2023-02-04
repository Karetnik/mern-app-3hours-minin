import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {useAuth} from "../hooks/auth.hook";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkCard";

export const DetailPage = () => {
  const [link, setLink] = useState('')
  const {request, loading} = useHttp()
  const {token} = useAuth()
  const linkId = useParams().id

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLink(fetched)
      // console.log('DetailPage ' + fetched);
    } catch (e) {}
  }, [request, linkId, token])

  useEffect(() => {
    getLink()
  }, [getLink])


  if (loading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      {!loading && link && <LinkCard link={link.link}/>}
    </>
  )
}
