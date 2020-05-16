import React from 'react'
import getPastTime from './getPastTime'
import PublicIcon from '@material-ui/icons/Public'
import formateNumber from './formateNumber'
import getReaction from './getReaction'
import Zoom from '@material-ui/core/Zoom'

export default function getCardSubHeaderText(timestamp) {
  return (
    <>
      {getPastTime(timestamp) + ' - '}
      <PublicIcon className="subheader-icon grey-color " />
    </>
  )
}

export function getCardSubHeaderProfileSummary(user) {
  return (
    <>
      <div className="grey-color ">
        <b>{formateNumber(user.no_of_likes) || 0}</b> Likes&nbsp;{' '}
        <b>{formateNumber(user.no_of_loves) || 0}</b> Love &nbsp;{' '}
        <b>{formateNumber(user.no_of_followers) || 0}</b> Followers
      </div>
    </>
  )
}

export function getCardSubHeaderReactionsSummary(post) {
  return (
    <>
      {post.likes ? (
        <>
          <img alt="NA" className="subheader-icon" src={getReaction('like')} />{' '}
          <b className="grey-color ">&nbsp;{formateNumber(post.likes)}</b>
        </>
      ) : null}{' '}
      &nbsp;&nbsp;
      {post.dislikes ? (
        <>
          <img
            alt="NA"
            className="subheader-icon"
            src={getReaction('dislike')}
          />{' '}
          <b className="grey-color ">&nbsp;{formateNumber(post.dislikes)}</b>
        </>
      ) : null}
      &nbsp;&nbsp;
      {post.love ? (
        <>
          <img alt="NA" className="subheader-icon" src={getReaction('love')} />{' '}
          <b className="grey-color ">&nbsp;{formateNumber(post.love)}</b>
        </>
      ) : null}
      &nbsp;&nbsp;
      {post.tounghout ? (
        <>
          <img
            alt="NA"
            className="subheader-icon"
            src={getReaction('tounghout')}
          />
          <b className="grey-color ">&nbsp; {formateNumber(post.tounghout)}</b>
        </>
      ) : null}
      &nbsp;&nbsp;
      {post.wow ? (
        <>
          <img alt="NA" className="subheader-icon" src={getReaction('wow')} />{' '}
          <b className="grey-color ">&nbsp;{formateNumber(post.wow)}</b>
        </>
      ) : null}
      &nbsp;&nbsp;
      {post.perfect ? (
        <>
          <img
            alt="NA"
            className="subheader-icon"
            src={getReaction('perfect')}
          />{' '}
          <b className="grey-color ">&nbsp;{formateNumber(post.perfect)}</b>
        </>
      ) : null}
      &nbsp;&nbsp;
      {post.thinking ? (
        <>
          <img
            alt="NA"
            className="subheader-icon"
            src={getReaction('thinking')}
          />{' '}
          <b className="grey-color ">&nbsp;{formateNumber(post.thinking)}</b>
        </>
      ) : null}
      &nbsp;&nbsp;
    </>
  )
}

export function getCardSubHeaderStatus(post) {
  return (
    <>
      {post.approved ? <small>Accepted</small> : null}
      {post.rejected ? <small>Rejected</small> : null}
      {!post.approved && !post.rejected ? <small>Pending</small> : null}
    </>
  )
}
