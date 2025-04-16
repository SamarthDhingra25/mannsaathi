import React from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

function VideoChat() {
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ video: true });

  return (
    <div className="container text-center py-5">
      <h2>🎥 Video Chat</h2>
      <p>Status: {status}</p>
      <button className="btn btn-success me-2" onClick={startRecording}>Start Recording</button>
      <button className="btn btn-danger" onClick={stopRecording}>Stop Recording</button>
      {mediaBlobUrl && (
        <div className="mt-4">
          <video src={mediaBlobUrl} controls autoPlay loop width="400" />
        </div>
      )}
    </div>
  );
}

export default VideoChat;
