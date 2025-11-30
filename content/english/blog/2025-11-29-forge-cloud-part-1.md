---
title: "The Forge Cloud - Part I: The Motivation and the Minimal Loveable Product"
meta_title: "The Forge Cloud - Part I: The Motivation and the Minimal Loveable Product"
description: "The Forge Cloud - Part I: The Motivation and the Minimal Loveable Product"
slug: "forge-cloud-part-i"
date: 2025-11-29T17:00:00Z
image: "/images/forge-cloud-part-2.png"
categories: ["Technology", "Forge Cloud"]
author: "Clint Berry"
tags: ["technology", "cloud"]
draft: false
---

At Forge, we’re always looking for meaningful ways to support and accelerate the local tech community. A few months ago, one of our board members, Tod Hansmann, tossed out a simple but intriguing idea: *“What if we set up a few servers and let community members use them for hosting side projects or tinkering?”*

Naturally, I loved it.  
And naturally, I took it way too far.

Instead of “a few servers,” my brain immediately jumped to: *Let’s build a cloud. A real cloud. Our own cloud.*

So heads up, AWS—Forge Cloud is coming. (We’ll be the cloud provider that also hands out stickers and pizza.)

This post is the beginning of that story.


## Why Build Our Own Cloud?

It’s a fair question. Why on earth would anyone try to build their own cloud compute platform in 2025?

A few reasons:

### 1. To Learn

There’s something magical about pulling back the curtain and understanding how these massive systems actually work. Rolling up our sleeves and building a cloud—even a tiny one—forces us to understand networking, orchestration, storage, load balancing, container runtimes, and all the invisible glue that powers modern compute platforms.

### 2. Barriers Are Lower Than Ever

Fifteen years ago, building your own cloud would’ve required a warehouse, millions of dollars, and a team of grizzled engineers who spoke only in Bash.  
Today? With projects like Kubernetes, K3D, Knative, Postgres Operators, and modern automation tools, the barrier to entry has dropped dramatically.

You still need time and curiosity, but not a data center and a fortune.

### 3. Cost (Kind Of)

This isn’t a great argument if you’re talking about a typical startup taking advantage of generous free tiers from major cloud providers. But *for our community*, where people want to experiment, prototype, and learn without worrying about surprise billing—there’s an opportunity.

Because it’s our hardware, our electricity, and our community focus, we can offer a far more generous free tier than you’ll find anywhere else. It’s a playground built *by* developers, *for* developers.


## The Minimal Lovable Product (MLP)

I’ll admit: I have a tendency to overthink long-term roadmaps. Within minutes of Tod’s suggestion, I was already imagining NVIDIA GPU nodes so local AI startups could train models on Forge hardware.

But before we add A100s and rack-mounted RGB lights, we need something else first: a **Minimal Lovable Product**—the smallest version of Forge Cloud that is actually useful *and* brings a smile to someone’s face.

Here’s what that looks like:

### 1. Run a Container (Easily)

The simplest, most flexible foundation is to let users deploy a container. This is Cloud Run-style usability: point us to an image, give us a port, and go.

Knative—an open source project originally developed at Google—provides a ton of this functionality already. The idea is to let someone ship code in minutes, not hours.

### 2. A Simple Path to a Database

Most projects—even tiny weekend experiments—need a data store. Rebuilding RDS from scratch is… ambitious. But tools like **Zalando’s Postgres Operator** have made reliable, container-native PostgreSQL deployments almost turnkey.

Because Forge Cloud is meant for small, non-production, creative tinkering, we don’t need huge scaling or multi-AZ failover. We just need something stable, easy to provision, and easy to tear down.

That’s it.  
That’s the MLP.  
How hard could it be, right?


## Shaping the Experience

Early in my career, I always started projects with the database schema. It felt like the “engineer” thing to do. But over time I’ve learned that starting with the **user experience**—how something *should* feel, not how it should be architected—leads to better products and far less refactoring.

Basecamp’s *Shape Up* methodology captures this perfectly, and it’s the approach I’m using for Forge Cloud. Before writing any YAML, I wrote a short shaping document outlining the experience: what deploying a service should feel like, how databases should be provisioned, how logs should be accessed, and where future features will fit in.

That shaping document is our guiding star for the next few months as we turn this dream into actual running hardware and software.

## What’s Next

This is just Part I. Over the next several posts, I’ll walk through each part of the process—from the hardware and networking setup to the orchestration layer to the developer experience on top.

Here’s the rough roadmap:

- **Part II – Picking and Prepping the Hardware**  
- **Part III – Cloud Foundation: K3D Setup and Essential Tools**  
- **Part IV – Databases as a Service with Postgres Operator**  
- **Part V – Our Cloud Run Clone Using Knative**  
- **Part VI – Building the Forge Cloud API**  
- **Part VII – HTMX for the Front-End**  
- **Part VIII – Adding New Hardware with Node Affinity**

If you’re excited about this, want to help, or just want early access to tinker: reach out. This is a community project, and the whole point is to build something *together*.

Forge Cloud… here we go.