package queue

import (
	"encoding/json"
	"fmt"
	"github.com/streadway/amqp"
	"log"
	"os"
)

type RabbitMQConsumer struct {
	conn    *amqp.Connection
	channel *amqp.Channel
}

func buildConnectionString() string {
	return fmt.Sprintf(
		"amqp://%s:%s@%s:%s/",
		os.Getenv("RABBIT_MQ_USER"),
		os.Getenv("RABBIT_MQ_PASSWORD"),
		os.Getenv("RABBIT_MQ_HOST"),
		os.Getenv("RABBIT_MQ_PORT"),
	)
}

func NewRabbitMQ() *RabbitMQConsumer {
	log.Println(buildConnectionString())
	conn, err := amqp.Dial(buildConnectionString())
	if err != nil {
		log.Fatalf("failed to connect to RabbitMQConsumer: %v", err)
	}

	channel, err := conn.Channel()
	if err != nil {
		log.Fatalf("failed to open a channel: %v", err)
	}

	return &RabbitMQConsumer{
		conn:    conn,
		channel: channel,
	}
}

func (r *RabbitMQConsumer) RegisterConsumer(queueName string, handler func(amqp.Delivery)) {
	msgs, err := r.channel.Consume(
		queueName,
		"",
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		log.Fatalf("failed to register consumer: %v", err)
	}

	go func() {
		for msg := range msgs {
			handler(msg)
		}
	}()
}

func (r *RabbitMQConsumer) StartConsuming() error {
	select {}
}

func (r *RabbitMQConsumer) Shutdown() {
	r.channel.Close()
	r.conn.Close()
}

type RabbitMQSender struct {
	conn    *amqp.Connection
	channel *amqp.Channel
}

func NewRabbitMQSender() *RabbitMQSender {
	log.Println(buildConnectionString())
	conn, err := amqp.Dial(buildConnectionString())
	if err != nil {
		log.Fatalf("failed to connect to RabbitMQSender: %v", err)
	}

	channel, err := conn.Channel()
	if err != nil {
		log.Fatalf("failed to open a channel: %v", err)
	}

	return &RabbitMQSender{
		conn:    conn,
		channel: channel,
	}
}

func (r *RabbitMQSender) Send(queueName string, body interface{}) error {
	_, err := r.channel.QueueDeclare(
		queueName,
		true,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		return fmt.Errorf("failed to declare a queue: %v", err)
	}

	bodyJSON, err := json.Marshal(body)
	if err != nil {
		return fmt.Errorf("failed to marshal body to JSON: %v", err)
	}

	err = r.channel.Publish(
		"",
		queueName,
		false,
		false,
		amqp.Publishing{
			ContentType: "application/json",
			Body:        bodyJSON,
		},
	)
	if err != nil {
		return fmt.Errorf("failed to publish a message: %v", err)
	}

	return nil
}

func (r *RabbitMQSender) Shutdown() {
	r.channel.Close()
	r.conn.Close()
}
