# Generated by Django 5.2.2 on 2025-06-08 13:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0002_remove_movies_genres_movies_genres'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movies',
            name='score',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
