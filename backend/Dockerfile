FROM python:3.13-slim AS builder
 
WORKDIR /app
 
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1 
 
RUN pip install --upgrade pip 
 
COPY requirements.txt ./requirements.txt
 
RUN pip install --no-cache-dir -r requirements.txt
 
FROM python:3.13-slim
 
RUN useradd -m -r user && mkdir /app && chown -R user /app
 
COPY --from=builder /usr/local/lib/python3.13/site-packages/ /usr/local/lib/python3.13/site-packages/
COPY --from=builder /usr/local/bin/ /usr/local/bin/
 
WORKDIR /app
 
COPY --chown=user:user . .
 
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1 
 
USER user
 
EXPOSE 8000 
 
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "config.wsgi:application"]