# Generated by Django 2.1.1 on 2019-03-07 17:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20190213_1702'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='undergrads_major',
            field=models.CharField(blank=True, default='', max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='undergrads_university',
            field=models.CharField(blank=True, default='', max_length=100, null=True),
        ),
    ]
