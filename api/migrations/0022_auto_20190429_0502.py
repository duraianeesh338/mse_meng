# Generated by Django 2.1.5 on 2019-04-29 05:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0021_post_files'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='files',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
    ]
