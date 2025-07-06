chrome.runtime.onInstalled.addListener(() => {
  console.log("✅ Azamjonbro Roadmap service worker yuklandi");

  chrome.alarms.create("dailyReminder", {
    delayInMinutes: 1,
    periodInMinutes: 1440
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "dailyReminder") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon128.jpg",
      title: "Azamjonbro Roadmap",
      message: "📘 Grammar qilishni boshlaylikmi?",
      priority: 2
    });
  }
});
