from rest_framework import serializers
from .models import Movies, Scores, Cast, Character, Genres

class MoviesSerializer(serializers.ModelSerializer):
    genres = serializers.StringRelatedField(many=True)
    user_score = serializers.SerializerMethodField()

    class Meta:
        model = Movies
        fields = [ "id", "title", "synopsis", "poster", "score", "genres", "year","cast", "user_score"]

    def get_user_score(self, obj):
        user_id = self.context.get('user_id')
        try:
            score = Scores.objects.get(user_id=user_id, movie=obj)
            return score.star
        except Scores.DoesNotExist:
            return None

class ScoresSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scores
        fields = [ "star", "movie_id", "user_id"]

class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = ['character']

class CastSerializer(serializers.ModelSerializer):
    character = serializers.SerializerMethodField()


    class Meta:
        model = Cast
        fields = [ "id","realName", "age", "biography", "profileIMG", "character"]

    def get_character(self, obj):
        movie_id = self.context.get('movie_id')
        character = Character.objects.filter(movie_id=movie_id, cast=obj)
        return CharacterSerializer(character, many=True).data
