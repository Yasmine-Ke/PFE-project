import React from 'react';
import QRCode from 'qrcode.react';

function QRCodeComponent() {
  const data = 'https://mapcarta.com/fr/N6172510785'; // the data to encode in the QR code

  return (
    <div>
      
      <QRCode value={data} />
    </div>
  );
}

export default QRCodeComponent;
