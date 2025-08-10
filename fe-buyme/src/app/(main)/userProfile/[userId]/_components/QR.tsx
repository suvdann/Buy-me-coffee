const QRCodeImage = ({ base64 }: { base64: string }) => {
  return (
    <div className="flex justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <img 
          src={base64} 
          alt="QR Code" 
          className="w-48 h-48 object-contain"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    </div>
  );
};

export default QRCodeImage;
