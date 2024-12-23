import SocketLog from '@/components/socketLog';
import LowCodeEditor from '@/components/LowCodeEditor';

function HomePage() {
  return (
    <div className='w-full' style={{height:"100vh"}}>
      <div style={{
        position: 'fixed',
        bottom: 5,
        right: 5
      }}>
        <SocketLog />
      </div>
      <LowCodeEditor />
    </div>);
}

export default HomePage;