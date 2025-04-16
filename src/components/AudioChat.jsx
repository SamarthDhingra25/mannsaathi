import React from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

function AudioChat() {
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true });

  return (
    <div className="container text-center py-5">
      <h2>🎤 Audio Chat</h2>
      <p>Status: {status}</p>
      <button className="btn btn-success me-2" onClick={startRecording}>Start Recording</button>
      <button className="btn btn-danger" onClick={stopRecording}>Stop Recording</button>
      {mediaBlobUrl && (
        <div className="mt-4">
          <audio src={mediaBlobUrl} controls />
        </div>
      )}
    </div>
  );
}

export default AudioChat;
