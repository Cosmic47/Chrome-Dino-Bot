function solve(width, height, gravity, jump_vel, speed) {
    dist = width + (jump_vel + Math.sqrt(jump_vel * jump_vel + 2 * gravity * height)) / gravity * speed;
    return -dist;
}

orig_update = Runner.prototype.update;
Runner.prototype.update = function update(deltaTime, opt_status) {
    orig_update.call(this, deltaTime, opt_status);
    
    dino_right = this.tRex.xPos + 1 + this.tRex.config.WIDTH;
    
    if ((this.horizon.obstacles.length > 0) && (this.horizon.obstacles[0].xPos > dino_right))
        obst = this.horizon.obstacles[0]
    else if (this.horizon.obstacles.length > 1)
        obst = this.horizon.obstacles[1]
    else
        return;

    if ((obst.typeConfig.type === "PTERODACTYL") && (obst.yPos === 50))
        return;
    
    jump_vel = -this.tRex.config.INITIAL_JUMP_VELOCITY;
    gravity = -this.tRex.config.GRAVITY;
    speed = this.currentSpeed + obst.speedOffset;

    max_dist = solve(obst.width, obst.typeConfig.height, gravity, jump_vel, speed);

    if (obst.xPos - this.tRex.xPos + 8 < max_dist) {
        this.tRex.startJump(0);
    }
}
