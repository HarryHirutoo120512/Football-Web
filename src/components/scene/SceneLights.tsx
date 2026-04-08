export default function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-3, -3, -3]} intensity={0.4} color="#ffffff" />
      <pointLight position={[3, 3, 0]} intensity={0.6} color="#ffffff" />
    </>
  );
}