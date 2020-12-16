import React, { useCallback, useEffect, useState } from 'react';
import SearchHeader from './component/search_header/search_header';
import VideoList from './component/video_list/video_list';
import styles from './App.module.css';
import VideoDetail from './component/video_detail/video_detail';

const App = ({youtube}) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  const selectVideo = (video) => {
    setSelectedVideo(video);
  }

  const search = useCallback(query => {
    setSelectedVideo(null);
    youtube
      .search(query)
      .then(videos => {
        setVideos(videos);
      });
  }, []);

  useEffect(() => {
    youtube
      .mostPopular()
      .then(videos => setVideos(videos))
  }, [youtube]);

  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} />
      <section className={styles.content}>
        {selectedVideo && ( 
        <div className={styles.detail}>
          <VideoDetail video={selectedVideo} /> 
        </div>
        )}
        <div className={styles.list}>
          <VideoList videos={videos} onVideoClick={selectVideo} display={selectedVideo ? 'list' : 'grid'} />
        </div>
      </section>
    </div>
  )
}

export default App;