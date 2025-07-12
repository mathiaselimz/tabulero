firebase.auth().onAuthStateChanged(async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const uid = user.uid;
  const userDocRef = firebase.firestore().collection('users').doc(uid);

  // Load saved settings
  try {
    const docSnap = await userDocRef.get();
    if (docSnap.exists) {
      const data = docSnap.data();

      if (data.displayName) document.getElementById("display-name").value = data.displayName;
      if (data.email) document.getElementById("email").value = data.email;

      // Profile picture and logo uploads are file inputs; you’ll need extra logic to load/display these images — skipping here

      if (data.timezone) document.getElementById("timezone").value = data.timezone;
      if (data.welcomeMessage) document.getElementById("welcome-message").value = data.welcomeMessage;
      if (data.footerText) document.getElementById("footer-text").value = data.footerText;

      // Notification toggles
      if (data.notifClientSignup !== undefined) {
        document.querySelector('input[name="notifClientSignup"]').checked = data.notifClientSignup;
      }
      if (data.notifMessages !== undefined) {
        document.querySelector('input[name="notifMessages"]').checked = data.notifMessages;
      }
      if (data.notifInvoices !== undefined) {
        document.querySelector('input[name="notifInvoices"]').checked = data.notifInvoices;
      }
      if (data.notifTasks !== undefined) {
        document.querySelector('input[name="notifTasks"]').checked = data.notifTasks;
      }

      if (data.notifFrequency) {
        document.getElementById("notif-frequency").value = data.notifFrequency;
      }

      // User role (disabled, but load if exists)
      if (data.userRole) {
        document.getElementById("user-role").value = data.userRole;
      }

      // Security settings
      if (data.enable2fa !== undefined) {
        document.querySelector('input[name="enable2fa"]').checked = data.enable2fa;
      }
      if (data.sessionTimeout) {
        document.getElementById("session-timeout").value = data.sessionTimeout;
      }

      // Integrations
      if (data.paymentProcessor) {
        document.getElementById("payment-processor").value = data.paymentProcessor;
      }
      if (data.cloudStorage) {
        document.getElementById("cloud-storage").value = data.cloudStorage;
      }
      if (data.emailMarketing) {
        document.getElementById("email-marketing").value = data.emailMarketing;
      }

      // Customization
      if (data.invitationEmail) {
        document.getElementById("invitation-email").value = data.invitationEmail;
      }
      if (data.defaultClientPermissions) {
        document.getElementById("default-client-permissions").value = data.defaultClientPermissions;
      }
      if (data.defaultFolderSettings) {
        document.getElementById("default-folder-settings").value = data.defaultFolderSettings;
      }
    }
  } catch (error) {
    console.error("Error loading settings:", error);
  }

  // Save form data on submit
  document.getElementById("account-settings-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect data
    const displayName = document.getElementById("display-name").value;
    const email = document.getElementById("email").value;
    const timezone = document.getElementById("timezone").value;
    const welcomeMessage = document.getElementById("welcome-message").value;
    const footerText = document.getElementById("footer-text").value;

    const notifClientSignup = document.querySelector('input[name="notifClientSignup"]').checked;
    const notifMessages = document.querySelector('input[name="notifMessages"]').checked;
    const notifInvoices = document.querySelector('input[name="notifInvoices"]').checked;
    const notifTasks = document.querySelector('input[name="notifTasks"]').checked;

    const notifFrequency = document.getElementById("notif-frequency").value;
    const userRole = document.getElementById("user-role").value;

    const enable2fa = document.querySelector('input[name="enable2fa"]').checked;
    const sessionTimeout = document.getElementById("session-timeout").value;

    const paymentProcessor = document.getElementById("payment-processor").value;
    const cloudStorage = document.getElementById("cloud-storage").value;
    const emailMarketing = document.getElementById("email-marketing").value;

    const invitationEmail = document.getElementById("invitation-email").value;
    const defaultClientPermissions = document.getElementById("default-client-permissions").value;
    const defaultFolderSettings = document.getElementById("default-folder-settings").value;

    try {
      // Save data to Firestore (merge so it doesn't overwrite unrelated data)
      await userDocRef.set({
        displayName,
        email,
        timezone,
        welcomeMessage,
        footerText,

        notifClientSignup,
        notifMessages,
        notifInvoices,
        notifTasks,
        notifFrequency,

        userRole,

        enable2fa,
        sessionTimeout,

        paymentProcessor,
        cloudStorage,
        emailMarketing,

        invitationEmail,
        defaultClientPermissions,
        defaultFolderSettings
      }, { merge: true });

      // Update Firebase Auth displayName and email (email update requires re-authentication in Firebase Auth, so usually done separately)
      await user.updateProfile({ displayName });
      // For email, you would normally call user.updateEmail(email) but that requires re-auth and extra handling

      alert("✅ Settings saved!");
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("❌ Failed to save settings");
    }
  });
});
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('Logged in user UID:', user.uid);
  } else {
    console.log('No user logged in');
  }
});
// Your existing onAuthStateChanged code ...

// Your existing save form submission listener ...

// Add this at the end:
document.getElementById('logout-btn').addEventListener('click', () => {
  firebase.auth().signOut()
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch((error) => {
      console.error('Error signing out:', error);
      alert('Failed to log out. Please try again.');
    });
});

