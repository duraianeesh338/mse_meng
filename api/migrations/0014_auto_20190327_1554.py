# Generated by Django 2.1.5 on 2019-03-27 15:54

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_auto_20190327_0520'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='deadline',
            field=models.DateField(blank=True, default=datetime.datetime.today),
        ),
        migrations.AlterField(
            model_name='post',
            name='relevent_file',
            field=models.FileField(default=False, upload_to=''),
        ),
    ]