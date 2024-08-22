import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const showCustomerSupportForm = () => {
  emailjs.init('l3e-sdkssAkk8vKAC'); // Initialize EmailJS with your public key

  Swal.fire({
    title: '<h2 class="text-xl font-patrick mb-1 ">Customer Support</h2>',
    html: `
      <form id="customer-support-form" class="space-y-2">
        <div class="form-group mt-2 flex flex-col md:flex-row md:ml-5 items-center space-y-2 md:space-y-0 md:space-x-2">
          <label for="name" class="block mb-1 w-full md:w-auto font-patrick">Name</label>
          <input type="text" id="name" class="swal2-input border border-gray-300 rounded p-2 w-1/2 max-w-xs md:max-w-md ml-2 " placeholder="Your name" required>
        </div>
        <div class="form-group mt-2 flex flex-col md:flex-row md:ml-5 items-center space-y-2 md:space-y-0 md:space-x-2">
          <label for="email" class="block mb-1 w-full md:w-auto font-patrick">Email</label>
          <input type="email" id="email" class="swal2-input border border-gray-300 rounded p-2 w-1/2 max-w-xs md:max-w-md ml-1" placeholder="Your email" required>
        </div>
        <div class="form-group mt-2 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-1">
          <label for="message" class="block mb-1 w-full md:w-auto text-nowrap font-patrick">Message</label>
          <textarea id="message" class="swal2-textarea border border-gray-300 rounded  w-3/4 max-w-xs md:max-w-md  " placeholder="Your message" required></textarea>
        </div>
        <div class="form-group mt-2 flex justify-center md:justify-center">
          <button type="button" id="whatsapp-btn" class="bg-indigo-500 hover:bg-gray-600 text-white rounded px-4 py-2 font-patrick ">
            WhatsApp
          </button>
        </div>
      </form>
    `,
    showCancelButton: true,
    confirmButtonText: 'Mail',
    customClass: {
      popup: 'p-4 rounded-lg',
      confirmButton: 'bg-indigo-500 font-patrick text-white rounded px-4 py-2',
      cancelButton: 'bg-gray-700 font-patrick text-white rounded px-4 py-2 ml-2'
    },
    preConfirm: () => {
      const name = Swal.getPopup().querySelector('#name').value;
      const email = Swal.getPopup().querySelector('#email').value;
      const message = Swal.getPopup().querySelector('#message').value;
      if (!name || !email || !message) {
        Swal.showValidationMessage('Please fill out all fields');
      }
      return { name, email, message };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const { name, email, message } = result.value;
  
      // Show loading indicator
      Swal.fire({
        title: 'Sending...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading(); // Display loading indicator
        }
      });

      // Simulate a delay of 2 seconds (2000 ms) for the loader
      setTimeout(() => {
        // Sending email using EmailJS
        emailjs.send('service_60c4pub', 'template_n31okuw', {
          from_name: name,
          from_email: email,
          message: message,
        }, 'l3e-sdkssAkk8vKAC') // Ensure this is your EmailJS public key
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          Swal.fire({
            title: 'Sent!',
            text: 'Your message has been sent.',
            icon: 'success',
            timer: 1000, // Auto-close after 1 second
            showConfirmButton: false
          });
        }, (error) => {
          console.error('FAILED...', error);
          Swal.fire('Error', 'Failed to send message.', 'error');
        });
      }, 2000); // Delay of 2 seconds before sending the email and showing the result
    }
  });
  
  // Event listener for WhatsApp button
  document.getElementById('whatsapp-btn').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const whatsappMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const whatsappUrl = `https://wa.me/+917377237009?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  });
};
