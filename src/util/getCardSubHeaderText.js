import PublicIcon from '@material-ui/icons/Public'
import React from 'react'
import Zoom from '@material-ui/core/Zoom'
import formateNumber from './formateNumber'
import getPastTime from './getPastTime'
import getReaction from './getReaction'

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
      <div className="title-color">
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
      {post.approved ? <span>Accepted</span> : null}
      {post.rejected ? <span>Rejected</span> : null}
      {!post.approved && !post.rejected ? <span>Pending</span> : null}
    </>
  )
}
