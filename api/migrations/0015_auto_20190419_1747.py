# Generated by Django 2.1.5 on 2019-04-19 17:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_auto_20190327_1554'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='deadline',
        ),
        migrations.AddField(
            model_name='post',
            name='semester',
            field=models.CharField(default='[]', max_length=10),
        ),
    ]