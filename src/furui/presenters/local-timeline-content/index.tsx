import * as React from 'react'

import { Line } from 'rc-progress'

import PostForm from '../../containers/local-timeline/post-form'
import Timeline from '../../containers/local-timeline/timeline'
import styles from './index.css'
import { AlbumFile, Post } from '../../models'

export default ({
  onDrop,
  isDrop,
  setIsDrop,
  uploadAlbumFile,
  isUploading,
  uploadState,
  draftDisabled,
  setDraftDisabled,
  files,
  setFiles,
  inReplyTo,
  setInReplyTo,
  replyToPost,
}: {
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void
  isDrop: boolean
  setIsDrop: (b: boolean) => void
  uploadAlbumFile: (a: File) => void
  isUploading: boolean
  uploadState: number
  draftDisabled: boolean
  setDraftDisabled: (b: boolean) => void
  files: AlbumFile[]
  setFiles: (a: AlbumFile[]) => void
  inReplyTo: number | null
  setInReplyTo: React.Dispatch<React.SetStateAction<number | null>>
  replyToPost: Post | null
}) => {
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDrop(true)
  }
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDrop(false)
  }
  return (
    <div
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      style={{ marginTop: inReplyTo ? '-32px' : '0px' }}
      className={styles.dragAreaContainer}
    >
      <div className={styles.dragAreaBackgrond} hidden={!isDrop}>
        <div className={styles.dragArea}>
          <p>ファイルをドラッグしてアップロード</p>
        </div>
      </div>
      <div className={styles.progressContainer} hidden={!isUploading}>
        <Line
          percent={uploadState}
          strokeLinecap="square"
          strokeColor="var(--color-accent)"
        />
      </div>
      <PostForm
        draftDisabled={draftDisabled}
        setDraftDisabled={setDraftDisabled}
        files={files}
        setFiles={setFiles}
        uploadAlbumFile={uploadAlbumFile}
        inReplyTo={inReplyTo}
        setInReplyTo={setInReplyTo}
        replyToPost={replyToPost}
      />
      <Timeline setInReplyTo={setInReplyTo} />
    </div>
  )
}
