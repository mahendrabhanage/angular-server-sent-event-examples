import { Component } from '@angular/core';

@Component({
  selector: 'app-stream',
  template: `<button (click)="fetchStream()" >Fetch Stream</button>`,
})
export class StreamComponent {
  async fetchStream() {
    const url = 'https://dev-api.copilot.urder.com/stream_text_message';    
    const payload = {
      user_id: 14989,
      user_access_token: "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyY2YyNDM2YS1iYzgzLTRlMzAtOTJlYi00OTlkNDFiZTc4NDIiLCJleHAiOjE3NTgwOTMzNjUsInN1YiI6IjE0OTg5Iiwic2NwIjoiYXBpX3YxX2F1dGhvcml6YXRpb25zX3VzZXIiLCJhdWQiOnsiYXVkIjoiVXNlciJ9LCJpYXQiOjE3MjY1NTczNjV9.gIuB8ugmQBzx2CTwd2bZ2nTzVIKAL7-frKCwqwuVJs0",
      user_message: 'Suggest me breakfast options',
      thread_id: 'thread_U14989_KEJsfwU39WhMGP4C'
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.body) {
        console.error('No response body.');
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      console.log('Receiving stream data...');
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          console.log('Received chunk:', chunk); // Log each received chunk
        }
      }

      console.log('Stream ended.');
    } catch (error) {
      console.error('Request failed:', error);
    }
  }
}
