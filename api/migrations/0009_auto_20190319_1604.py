# Generated by Django 2.1.1 on 2019-03-19 16:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20190314_2012'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='requirements',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='post',
            name='studentNeeded',
            field=models.IntegerField(default=0),
        ),
    ]