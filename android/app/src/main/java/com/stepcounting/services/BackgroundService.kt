package com.stepcounting.services

import android.app.Service
import android.content.Intent
import android.os.IBinder
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build
import androidx.core.app.NotificationCompat

class BackgroundService : Service() {

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        startForeground(1, getNotification())
        // Step counter başlatma kodları
        return START_STICKY
    }

    override fun onBind(intent: Intent): IBinder? {
        return null
    }

    private fun getNotification(): Notification {
        val channelId = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            createNotificationChannel("steps_channel", "My Background Service")
        } else {
            ""
        }

        return NotificationCompat.Builder(this, channelId)
                .setContentTitle("Step Counter is running")
                .setContentText("Step counting in background")
                .setSmallIcon(androidx.core.R.drawable.notification_bg)
                .build()
    }

    private fun createNotificationChannel(channelId: String, channelName: String): String {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(channelId, channelName, NotificationManager.IMPORTANCE_LOW)
            channel.lockscreenVisibility = Notification.VISIBILITY_PRIVATE
            getSystemService(NotificationManager::class.java).createNotificationChannel(channel)
        }
        return channelId
    }
}
