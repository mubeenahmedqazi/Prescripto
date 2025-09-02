import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div>
      {/* Title */}
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          PRIVACY <span className="text-gray-700 font-semibold">POLICY</span>
        </p>
      </div>

      {/* Content Section */}
      <div className="my-10 flex justify-center mb-28 text-sm">
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 md:p-10 max-w-3xl text-gray-600 leading-relaxed">
          <p className="mb-6">
            Prescripto is a doctor appointment booking app with **doctor and patient login**. Patients can create an account, book appointments, and manage their healthcare needs easily. We value your privacy and are committed to protecting your personal information.  
          </p>

          <ul className="list-disc pl-5 space-y-4">
            <li>
              <span className="font-semibold">Account Information:</span>  
              Patients and doctors must provide accurate credentials (name, email, password, and professional details for doctors) to access the app.
            </li>

            <li>
              <span className="font-semibold">Appointment Data:</span>  
              Appointment bookings, schedules, and related health details are stored securely and shared only with the assigned doctor and patient.
            </li>

            <li>
              <span className="font-semibold">Data Protection:</span>  
              All user data is encrypted and safeguarded. We do not sell or share your personal information with third parties for marketing purposes.
            </li>

            <li>
              <span className="font-semibold">Doctor Credentials:</span>  
              Doctors must verify their qualifications before approval. This ensures patients only book with verified professionals.
            </li>

            <li>
              <span className="font-semibold">Patient Rights:</span>  
              Patients can update their profile, view past appointments, and request deletion of their account anytime.
            </li>

            <li>
              <span className="font-semibold">Cookies & Tracking:</span>  
              The app may use cookies to improve user experience but does not track sensitive medical data.
            </li>

            <li>
              <span className="font-semibold">Policy Updates:</span>  
              Prescripto may update this Privacy Policy from time to time. Continued use of the app means you accept the updated terms.
            </li>
          </ul>

          <p className="mt-6 text-gray-500 text-sm">
            If you have questions regarding our Privacy Policy, please contact us at  
            <span className="font-semibold"> support@prescripto.com</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
